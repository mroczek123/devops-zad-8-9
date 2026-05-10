// CONSTANTS
export const Settings = {
    "REDIS_ADDRESS": process.env.REDIS_ADDRESS,
    "REDIS_PRODUCTS_KEY": "products",
    "PRODUCTS_CACHE_HITS_KEY": "PRODUCTS_CACHE_HITS",
    "REDIS_CACHE_SECONDS": 30,
    "DB_HOST": process.env.DB_HOST,
    "DB_PORT": process.env.DB_PORT,
    "DB_USER": process.env.DB_USER,
    "DB_PASSWORD": process.env.DB_PASSWORD,
    "DB_NAME": process.env.DB_NAME,
    "INSTANCE_ID": process.env.INSTANCE_ID,
    "port": process.env.PORT,
}
