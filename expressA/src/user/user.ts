import * as express from 'express';
import {hash, compare} from 'bcrypt'
import { userDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt'
const router = express.Router();
import * as dotenv from 'dotenv'
dotenv.config();

router.post('/signup', async(req,res) => {
    try {
    let { role, name, password }:userDto = req.body;

    const hashPassword = bcrypt.hashSync(password, process.env.salt)
    password = hashPassword;

    const user = await User.create({ role, name, password})
    await user.save()

    return res.json({ success:true })
    } catch (e) {
        return res.json({ success:false, e })
    }
})

router.post('/signin', async(res,req) => {
    
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