import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import redisClient from "../redis/redis";
import * as dotenv from 'dotenv'
import { promisify } from "util";
dotenv.config();

export const tokenCheck = (req:Request, res:Response, next:NextFunction) => {
    const aToken = <string>req.headers['access'];
    const reToken = <string>req.headers['refresh'];
    
    let jwtPayload;
    const getAsync = promisify(redisClient.get).bind(redisClient);

    try {
        jwtPayload = <any>jwt.verify(aToken, process.env.JWT_ACCESS_SECRET)
        res.locals.jwtPayload = jwtPayload;  // 미들웨어를 거쳐 어디에서나 쓸수 있는 변수로 만듬

        const data = getAsync(res.locals.jwtPayload.userId);
        if(reToken === data) {
            try {
                jwt.verify(reToken, process.env.JWT_REFRESH_SECRET)
            } catch (e) {
                res.status(403).send()
            }
        }
    } catch (e) {
        res.status(400).send();
    }

    let {userId, userName} = jwtPayload;
    
    const accessToken = jwt.sign(
        {userId, userName},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: '1h'}
    );
    const refreshToken = jwt.sign(
        {userId, userName},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:'12d'}
    )
    
    res.setHeader("access", accessToken); // 키/값 을 인자로 받아 헤더에 세팅한다.
    res.setHeader("refresh", refreshToken);

    next();
}