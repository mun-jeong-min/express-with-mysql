import * as express from 'express';
import { getRepository } from 'typeorm';
import { commentDto } from '../dto/comment/comment.dto';
import { Comment } from '../entity/comment.entity';

const router = express.Router();

router.post('/create', async(req:express.Request, res:express.Response) => {
    let {script}:commentDto = req.body;

    const commentRepository = await getRepository(Comment);
    let comment = new Comment();

    comment.script = script;
})