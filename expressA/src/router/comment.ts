import * as express from 'express';
import { getRepository } from 'typeorm';
import { commentDto } from '../entity/comment/dto/comment.dto';
import { Comment } from '../entity/comment/comment.entity';
import { User } from '../entity/user/user.entity';
import { Board } from '../entity/board/board.entity';

const router = express.Router();

router.post('/create/:id', async(req:express.Request, res:express.Response) => {
    let {script}:commentDto = req.body;
    let idP = req.params.id;

    const commentRepository = getRepository(Comment);
    const boardRepository = getRepository(Board);
    const userRepository = getRepository(User);

    const id = await res.locals.jwtPayload.userId;
    
    const user = await userRepository.findOneOrFail({where: {id:id}});
    const board = await boardRepository.findOneOrFail({where: {id: idP}});

    let comment = new Comment();

    comment.script = script;
    comment.user = user;
    comment.board = board;

    try {
        await commentRepository.save(comment);
    } catch (e) {
        res.status(400).send(e)
        return;
    }
    return res.status(200).send("댓글 작성")
})

router.get('/find', async(req:express.Request, res: express.Response) => {
    const commentRepository = getRepository(Comment);
    
    try {
     const data = await commentRepository.find();
     res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
})

export default router