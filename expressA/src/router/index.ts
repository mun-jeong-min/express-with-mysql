import * as express from 'express'
const router = express.Router();
import userRouter from './routes/user'
import boardRouter from './routes/board'
import refreshRouter from './routes/refresh'
import commentRouter from './routes/comment'
import groupRouter from './routes/group'
import profileRouter from './routes/profile'
import { tokenCheck } from '../middleware/jwtCheck';
import { roleCheck } from '../middleware/roleCheck';

router.use('/board', [tokenCheck] ,boardRouter);
router.use('/user', userRouter);
router.use('/refresh', refreshRouter);
router.use('/comment',[tokenCheck], commentRouter);
router.use('/group', [tokenCheck, roleCheck],  groupRouter);
router.use('/profile', [tokenCheck], profileRouter);

export default router