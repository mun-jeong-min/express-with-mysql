import * as express from 'express';
import { userDto } from '../entity/user/dto/signup.dto';
import { User } from '../entity/user/user.entity';
import * as bcrypt from 'bcrypt'
const router = express.Router();
import * as dotenv from 'dotenv'
import { getRepository } from 'typeorm';
import { loginDto } from '../entity/user/dto/login.dto';
import * as jwt from 'jsonwebtoken'
import redisClient from '../redis/redis';
dotenv.config();

router.post('/signup', async(req: express.Request, res: express.Response) => {
    let { role, name, password }:userDto = req.body;
    let user = new User();

    const hashPassword = bcrypt.hashSync(password,+process.env.salt)

    user.role = role;
    user.password = hashPassword;
    user.name = name;

    const userRepository = getRepository(User);

    try {
        await userRepository.save(user)
    } catch (e) {
        return res.status(409).send("user already in use")
    }
    res.status(201).send("user created")
})

router.post('/signin', async(req:express.Request, res:express.Response) => {
    let {name, password}:loginDto = req.body;

    const userRepository = getRepository(User);
    let user: User;
    try {
        user = await userRepository.findOneOrFail({ where: {name}})
    } catch (e) {
        res.status(404).send("일치하는 유저가 없음");
    }

    if(!bcrypt.compareSync(password, user.password)){
        res.status(409).send();
        return;
    }
    const accessToken = jwt.sign(
        {userId: user.id, userName: name},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        process.env.JWT_ACCESS_SECRET,
        {expiresIn:'2h'}
    )
    const refreshToken = jwt.sign(  
        {userId: user.id
        },
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:'12d'}
    )
    redisClient.set(`${user.id}`, refreshToken) //*
    
    res.status(200).send(`로그인 성공 accessToken : ${accessToken}, refreshToken : ${refreshToken}`)
})

export default router