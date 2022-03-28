import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { promisify } from 'util';
import redisClient from '../redis/redis';
import router from './user';
import * as dotenv from 'dotenv'
import { getRepository } from 'typeorm';
import { User } from '../entity/user/user.entity';
dotenv.config()

router.post('/reGet', async(req:Request, res:Response) => {
    const aToken = <string>req.headers['access'];
    const reToken = <string>req.headers['refresh'];
    const id = req.body.id;

    const userRepository = getRepository(User)

    const getA = promisify(redisClient.get).bind(redisClient)
    const data = getA(id) 
    let user:User;
    try {                      
        user = await userRepository.findOneOrFail({where: {id}});
    } catch (e) {
        res.status(400).send()
        console.log(e)
    }

    jwt.verify(reToken, data) 
    jwt.verify(aToken, process.env.JWT_ACCESS_SECRET, {ignoreExpiration:true})
    
    const accessToken = jwt.sign(
        {userId:user.id, userName: user.name}
        ,process.env.JWT_ACCESS_SECRET,
        {expiresIn: '1h'}
        )
        
    res.status(200).send(`newAccesstoken: ${accessToken}`)
})

export default router