import * as jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm';
import { User } from '../entity/user/user.entity';

export const roleCheck = async(req,res) => {
    const accessToken = <string>req.headers['access'];
    
    let jwtPayload = await <any>jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
    
    let {userId, userName} = jwtPayload;
    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail({where:{id:userId}})
    
    if(!user) {
        res.status(404).send();
    }
    
    if(user.role === 'user') {
        res.status(403).send();
        return;
    }
    
    res.status(200).send();
}