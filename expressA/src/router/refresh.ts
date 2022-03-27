import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { promisify } from 'util';
import redisClient from '../redis/redis';
import router from './user';

router.post('/refresh', async(req:Request, res:Response) => {
    const reToken = <string>req.headers['refresh'];
    // accesstoken 유효기간 체크
    try {
        const getA = promisify(redisClient.get).bind(redisClient)
        const data = getA(res.locals.jwtPayload.id)

        
    } catch (e) {
        
    }
    
    
    // 없으면 refreshtoken 있는지 확인
    
    // 있으면 재발급
})