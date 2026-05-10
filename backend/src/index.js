import express from 'express';
import { Settings } from './settings.js';
import {readProducts, countProducts, writeProduct} from "./helpers.js"

const app = express();
zzz

app.use(express.json());


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
    "productsCacheHits": await redisClient.get(Settings.PRODUCTS_CACHE_HITS_KEY),
  });
})

app.listen(Settings.port, () => {
  console.log(`Example app listening on port ${Settings.port}`)
})