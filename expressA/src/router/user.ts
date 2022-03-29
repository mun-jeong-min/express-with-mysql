import * as express from 'express';
import { userDto } from '../entity/user/dto/signup.dto';
import { User } from '../entity/user/user.entity';
import * as bcrypt from 'bcrypt'
const router = express.Router();
import * as dotenv from 'dotenv'
import { getRepository } from 'typeorm';
import { loginDto } from '../entity/user/dto/login.dto';
import * as jwt from 'jsonwebtoken'
import redisClient from '../redis/redis';
import { signin, signup } from '../controller/user-controller';
dotenv.config();

router.post('/signup', signup);

router.post('/signin', signin);

export default router