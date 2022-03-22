import * as dotenv from 'dotenv'
dotenv.config();

import * as redis from 'redis'

const redisM = redis.createClient()

module.exports = redisM