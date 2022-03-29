import * as express from 'express'
const router = express.Router();
import userRouter from './routes/user'
import boardRouter from './routes/board'
import refreshRouter from './routes/refresh'
import commentRouter from './routes/comment'
import { tokenCheck } from '../middleware/jwtCheck';

router.use('/board', [tokenCheck] ,boardRouter);
router.use('/user', userRouter);
router.use('/refresh', refreshRouter);
router.use('/comment',[tokenCheck], commentRouter);

export default router