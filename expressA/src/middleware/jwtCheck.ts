import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config();

export const tokenCheck = (req:Request, res:Response, next:NextFunction) => {
    const token = <string>req.headers['auth'];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, process.env.JWT_SECRET)
        res.locals.jwtPayload = jwtPayload;  // 미들웨어를 거쳐 어디에서나 쓸수 있는 변수로 만듬
    } catch (e) {
        res.status(400).send();
    }

    let {userId, userName} = jwtPayload;
    const accessToken = jwt.sign(
        {userId, userName},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );

    res.setHeader("token", accessToken); // 키/값 을 인자로 받아 헤더에 세팅한다.

    next();
}