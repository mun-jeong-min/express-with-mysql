import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { promisify } from 'util';
import redisClient from '../../redis/redis';
import router from './user';
import * as dotenv from 'dotenv'
import { getRepository } from 'typeorm';
import { User } from '../../entity/user/user.entity';
import refreshController from '../../controller/refresh-controller';
dotenv.config()

router.post('/getToken', refreshController.refresh);

export default router