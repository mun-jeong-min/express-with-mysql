import * as express from 'express';
import {hash, compare} from 'bcrypt'
import { userDto } from '../dto/signup.dto';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt'
const router = express.Router();
import * as dotenv from 'dotenv'
import { getRepository } from 'typeorm';
import { loginDto } from '../dto/login.dto';
import * as jwt from 'jsonwebtoken'
dotenv.config();

router.post('/signup', async(req: express.Request, res: express.Response) => {
    let { role, name, password }:userDto = req.body;
    let user = new User();

    const hashPassword = bcrypt.hashSync(password,+process.env.salt)

    user.role = role,
    user.password = hashPassword;
    user.name = name;


    const userRepository = getRepository(User);

    try {
        await userRepository.save(user)
    } catch (e) {
        return res.status(409).send("name already in use")  
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
        res.status(401).send();
        return;
    }
    const token = jwt.sign(
        {userId: user.id, userName: name},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    )
    res.status(200).send(`로그인 성공 ${token}`)
})

export default router