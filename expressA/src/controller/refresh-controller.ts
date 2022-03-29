import { getRepository } from "typeorm";
import { User } from "../entity/user/user.entity";
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

export const refresh = async(req,res) => {
    let aToken = <string>req.headers['access'];
    // const reToken = <string>req.headers['refresh'];
    const id = req.body.id;

    const userRepository = getRepository(User)
    
    // const getA = promisify(redisClient.get).bind(redisClient)
    // const data = getA(id)
    
    /*
    const payload = await <any>jwt.verify(reToken, data)
    let {userId} = payload;
    */
   let user:User;
   
    try {
        user = await userRepository.findOneOrFail({where:{id:id}});
    } catch (e) {
        res.status(404).send("user not found")
    }
    
    const accessToken = jwt.sign(
        {userId:user.id, userName: user.name},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: '2h'}
        )
        
    res.status(200).send(`newAccesstoken: ${accessToken}`)
}

export default {refresh}