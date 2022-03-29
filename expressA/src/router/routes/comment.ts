import * as express from 'express';
import { getRepository } from 'typeorm';
import { commentDto } from '../../entity/comment/dto/comment.dto';
import { Comment } from '../../entity/comment/comment.entity';
import { User } from '../../entity/user/user.entity';
import { Board } from '../../entity/board/board.entity';
import commentController from '../../controller/comment-controller';

const router = express.Router();

router.post('/create/:id', commentController.createComment);

router.get('/find', commentController.findComment);

router.put('/update/:id', commentController.updateComment);

router.delete('/delete/:id', commentController.deleteComment);
export default router