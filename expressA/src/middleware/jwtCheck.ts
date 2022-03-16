import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config();

export const tokenCheck = (req:Request, res:Response, next:NextFunction) => {
    const token = <string>req.headers['auth'];
    let jwtPayload;

    try {
        jwtPayload = jwt.verify(token, process.env.JWT_SECRET)
        res.locals.jwtPayload = jwtPayload;
    } catch (e) {
        res.status(201).send();
    }

    let {userId, userName} = jwtPayload;
    const newToken = jwt.sign(
        {userId, userName},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );
    res.setHeader("token", newToken);
    
    next();
}