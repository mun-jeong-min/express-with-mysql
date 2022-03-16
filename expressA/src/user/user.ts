import * as express from 'express';
import {hash, compare} from 'bcrypt'
import { userDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt'
const router = express.Router();
import * as dotenv from 'dotenv'
import { getRepository } from 'typeorm';
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
        return res.status(409).send("password already in use")  
    }
    res.status(201).send("user created")
})

export default router