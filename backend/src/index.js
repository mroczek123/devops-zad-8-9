import pg from 'pg';
import { createClient } from 'redis';
import express from 'express';

// CONSTANTS
const REDIS_ADDRESS = process.env.REDIS_ADDRESS;
const REDIS_PRODUCTS_KEY = "products";
const PRODUCTS_CACHE_HITS_KEY = "PRODUCTS_CACHE_HITS";
const REDIS_CACHE_SECONDS = 30;

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const INSTANCE_ID = process.env.INSTANCE_ID;

const port = process.env.PORT;

const app = express();


app.use(express.json());

const postgresClient = await new pg.Client({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
}).connect();

const redisClient = createClient({
  url: REDIS_ADDRESS
});
redisClient.on('error', err => console.log('Redis Client Error', err));
await redisClient.connect();


async function readProducts() {
  const cacheResult = await redisClient.get(REDIS_PRODUCTS_KEY);
  if (cacheResult != null) {
    redisClient.incr(PRODUCTS_CACHE_HITS_KEY);
    return JSON.parse(cacheResult);
  }
  const pgResult = await postgresClient.query('SELECT id, name, price FROM products;');
  const products = pgResult.rows;
  redisClient.set(REDIS_PRODUCTS_KEY, JSON.stringify(products));
  redisClient.expire(REDIS_PRODUCTS_KEY, REDIS_CACHE_SECONDS);
  return products
}

async function countProducts() {
  const pgResult = await postgresClient.query('SELECT COUNT(*) FROM products;');
  return pgResult.rows[0].count;
}

async function writeProduct(newItem) {
  const text = 'INSERT INTO products (name, price) VALUES($1, $2);';
  const values = [newItem.name, newItem.price];
  postgresClient.query(text, values);
  redisClient.del(REDIS_PRODUCTS_KEY);
}

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/items', async (req, res) => {
  const products = await readProducts();
  res.send(products);
});

app.post('/items', async (req, res, next) => {
  const receivedJson = req.body;
  console.log(req);

  const newItem = {
    name: receivedJson.name,
    price: receivedJson.price,
  };

  writeProduct(newItem);
  res.status(201).send("");
  next();
})

app.get('/stats', async (req, res) => {
  res.send({
    "productsAmount": await countProducts(),
    "instanceId": INSTANCE_ID,
    "productsCacheHits": await redisClient.get(PRODUCTS_CACHE_HITS_KEY),
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})