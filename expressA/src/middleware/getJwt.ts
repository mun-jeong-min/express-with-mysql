import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

export const getJwt = async(req:Request, res:Response) => {
    const reToken = <string>req.headers['refresh'];

    // accesstoken 유효기간 체크,
    

    // 없으면 refreshtoken 있는지 확인


    // 있으면 재발급
}