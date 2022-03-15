import * as express from 'express';
import { userDto } from './dto/user.dto';
import { User } from './entity/user.entity';
const router = express.Router();

router.post('/signup', async(req,res) => {
    try {
    const { role, name, password }:userDto = req.body;

    const user = await User.create({ name, password, role })
    await user.save()
    return res.json({ success:true })
    } catch (e) {
        return res.json({ success:false, e })
    }
})
export default router