import * as express from 'express'
import { getRepository } from 'typeorm';
import { boardDto } from '../entity/board/dto/board.dto';
import { Board } from '../entity/board/board.entity'
import { User } from '../entity/user/user.entity';
import { Comment } from '../entity/comment/comment.entity';
import * as multer from 'multer'
import boardController from '../controller/board-controller';
import storage from '../middleware/imageCheck';
const router = express.Router();

const upload = multer({storage:storage})

router.post('/create', upload.single('image'), boardController.boardCreate);

router.get('/find', boardController.boardFind);

router.get('findOne/:id', boardController.findOne);

router.get('/findMine', boardController.findMine);

router.put('/update/:id', boardController.updateBoard);

router.delete('/delete/:id', boardController.deleteBoard);

export default router