import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import redisClient from "../redis/redis";
import * as dotenv from 'dotenv'
import { promisify } from "util";
dotenv.config();

export const tokenCheck = async(req:Request, res:Response, next:NextFunction) => {
    const aToken = <string>req.headers['access'];
    const reToken = <string>req.headers['refresh'];
    
    let jwtAccessPayload;
    let jwtRefreshPayload;

    try {
        jwtAccessPayload = await <any>jwt.verify(aToken, process.env.JWT_ACCESS_SECRET)
        res.locals.jwtPayload = jwtAccessPayload;  // 미들웨어를 거쳐 어디에서나 쓸수 있는 변수로 만듬

        jwtRefreshPayload = await <any>jwt.verify(reToken, process.env.JWT_REFRESH_SECRET)
    } catch (e) {
        res.status(400).send();
    }
    
    let {userId, userName} = jwtAccessPayload;
    
    const accessToken = jwt.sign(
        {userId, userName},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: '2h'}
    );

    const refreshToken = jwt.sign(
        {userId},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:'12d'}
    )

    res.setHeader("access", accessToken); // 키/값 을 인자로 받아 헤더에 세팅한다.
    res.setHeader("refresh", refreshToken);

    next();
}