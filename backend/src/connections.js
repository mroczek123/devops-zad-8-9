import pg from 'pg';
import { createClient } from 'redis';
import { Settings } from "./settings.js";

const postgresClient = await new pg.Client({
  user: Settings.DB_USER,
  password: Settings.DB_PASSWORD,
  host: Settings.DB_HOST,
  port: Settings.DB_PORT,
  database: Settings.DB_NAME,
}).connect();

const redisClient = createClient({
  url: Settings.REDIS_ADDRESS
});
redisClient.on('error', err => console.log('Redis Client Error', err));
await redisClient.connect();

export const Clients = {
    "postgresClient": postgresClient,
    "redisClient": redisClient
};