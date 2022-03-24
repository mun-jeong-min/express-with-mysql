import { NextFunction, Request, Response } from "express";
import { promisify } from "util";
import * as jwt from 'jsonwebtoken'
import redisClient from "../redis/redis";
import * as dotenv from 'dotenv'
dotenv.config();

export const refreshCheck = async(req:Request, res:Response, next:NextFunction) => {
    const token = <string>req.headers['refresh']

    const id = res.locals.jwtPayload.id;
    const getAsync = await promisify(redisClient.get).bind(redisClient)

    const data = await getAsync(id);
    if(token === data){
        try {
            jwt.verify(token,process.env.JWT_REFRESH_SECRET)
        } catch (e) {
            res.status(400).send();
            return false
        }
    }

    const refreshToken = jwt.sign(
        {},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:'12d'}
    )

    res.setHeader("refresh", refreshToken);

    next();
}