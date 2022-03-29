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
        res.status(409).send(e)
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
        res.status(404).send(e);
    }
})

router.put('/update/:id', async(req:express.Request, res:express.Response) => {
    const commentRepository = getRepository(Comment);

    const id = req.params.id;
    let {script}:commentDto = req.body;

    const comment = await commentRepository.findOne({where: {id:id}});

    comment.script = script;  
    
    try {
        await commentRepository.save(comment);
    } catch (e) {
        res.status(400).send();
        return;
    }
    res.status(200).send('업데이트 완료')
})

router.delete('/delete/:id', async(req:express.Request, res:express.Response) => {
    const commentRepository = getRepository(Comment);
    const id = req.params.id;

    const comment = await commentRepository.findOne({where: {id:id}});
    
    try {
        await commentRepository.delete(comment);    
    } catch (e) {
        res.status(400).send("댓글 삭제 실패")
        return;
    }
    res.status(200).send("댓글 삭제 성공")
})
export default router