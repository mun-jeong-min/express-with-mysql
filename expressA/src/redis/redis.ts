import * as redis from 'redis';
import * as dotenv from 'dotenv';
dotenv.config();

const redisInfo = {
    host: '127.0.0.1',
    port: process.env.REDIS_PORT,
    db: process.env.REDIS_DB,
    password: process.env.REDIS_PASSWORD
}

const redisClient = redis.createClient(redisInfo)

export default redisClient;