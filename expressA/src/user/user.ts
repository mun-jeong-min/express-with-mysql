import * as express from 'express';
import {hash, compare} from 'bcrypt'
import { userDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt'
const router = express.Router();
import * as dotenv from 'dotenv'
dotenv.config();

router.post('/signup', async(res: express.Response, req: express.Request) => {
    try {
    let { role, name, password }:userDto = req.body;
    let user = new User();

    const hashPassword = bcrypt.hashSync(password, process.env.salt)

    user.role = role,
    user.password = hashPassword;
    user.name = name;

    return res.json({ success:true })
    } catch (e) {
        return res.json({ success:false, e })
    }
})

/*
router.get('/find', async(req,res) => {
    try {
      const users = await User.find()
      return res.send({ users })   
    } catch (error) {
        return res.json({ success:"404", error })
    }
})*/


export default router