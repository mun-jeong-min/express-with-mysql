import * as redis from 'redis';
import * as dotenv from 'dotenv';
dotenv.config();

const info = {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
    db: +process.env.REDIS_DB,
    password: process.env.REDIS_PASSWORD
}

const redisClient = redis.createClient(info)

module.exports = redisClient;