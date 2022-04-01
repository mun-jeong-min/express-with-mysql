import * as express from 'express';
const router = express.Router();
import * as dotenv from 'dotenv'
import { signin, signup } from '../../controller/user/user-controller';
dotenv.config();

router.post('/signup', signup);

router.post('/signin', signin);

export default router