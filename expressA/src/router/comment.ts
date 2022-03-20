import * as express from 'express';
import { getRepository } from 'typeorm';
import { commentDto } from '../entity/comment/dto/comment.dto';
import { Comment } from '../entity/comment/comment.entity';
import { User } from '../entity/user/user.entity';

const router = express.Router();

router.post('/create', async(req:express.Request, res:express.Response) => {
    let {script}:commentDto = req.body;

    const commentRepository = await getRepository(Comment);
    const userRepository = await getRepository(User);

    const id = await res.locals.jwtPayload.userId;
    const user = await userRepository.findOneOrFail({where: {id:id}});

    let comment = new Comment();

    comment.script = script;
    comment.user = user;

    try {
        await commentRepository.save(comment);
    } catch (e) {
        res.status(400).send()
        return;
    }
    res.status(200).send()
})

export default router