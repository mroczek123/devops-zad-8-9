import { Settings } from "./settings.js";
import { Clients } from "./connections.js";

export async function readProducts() {
  const cacheResult = await Clients.redisClient.get(Settings.REDIS_PRODUCTS_KEY);
  if (cacheResult != null) {
    Clients.redisClient.incr(Settings.PRODUCTS_CACHE_HITS_KEY);
    return JSON.parse(cacheResult);
  }
  const pgResult = await Clients.postgresClient.query('SELECT id, name, price FROM products;');
  const products = pgResult.rows;
  Clients.redisClient.set(Settings.REDIS_PRODUCTS_KEY, JSON.stringify(products));
  Clients.redisClient.expire(Settings.REDIS_PRODUCTS_KEY, Settings.REDIS_CACHE_SECONDS);
  return products;
}

export async function countProducts() {
  const pgResult = await Clients.postgresClient.query('SELECT COUNT(*) FROM products;');
  return pgResult.rows[0].count;
}

export async function writeProduct(newItem) {
  const text = 'INSERT INTO products (name, price) VALUES($1, $2);';
  const values = [newItem.name, newItem.price];
  Clients.postgresClient.query(text, values);
  Clients.redisClient.del(Settings.REDIS_PRODUCTS_KEY);
}