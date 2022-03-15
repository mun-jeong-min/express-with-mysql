import * as express from 'express';
import { User } from './entity/user.entity';
const router = express.Router();

router.post('/signup', async(req,res) => {
    const { role, name, password } = req.body;

    const user = await User.create({ name, password, role })
    await user.save()
})

export default router