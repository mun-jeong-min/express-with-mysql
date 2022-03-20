import * as express from 'express';
import { getRepository } from 'typeorm';
import { commentDto } from '../entity/comment/dto/comment.dto';
import { Comment } from '../entity/comment/comment.entity';

const router = express.Router();

router.post('/create', async(req:express.Request, res:express.Response) => {
    let {script}:commentDto = req.body;

    const commentRepository = await getRepository(Comment);
    let comment = new Comment();

    comment.script = script;

    try {
        await commentRepository.save(comment);
    } catch (e) {
        res.status(400).send()
        return;
    }
    res.status(200).send()
})