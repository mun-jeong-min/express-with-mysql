import * as express from 'express'
import { getRepository } from 'typeorm';
import { boardDto } from './dto/board.dto';
import { Board } from './entity/board.entity';
const router = express.Router();

router.post('create', async(req: express.Request, res:express.Response) => {
    const boardRepository = getRepository(Board);

    let {title, description}:boardDto = req.body;
    let board:Board;
    
    board.title = title;
    board.description = description;

    try {
        await boardRepository.save(board);
    } catch (e) {
        res.status(400).send("게시판 작성에 실패하셨습니다.")
        return;
    }
    res.status(200).send("게시판 작성 성공")
})

export default router