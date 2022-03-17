import * as express from 'express'
import { userInfo } from 'os';
import { getRepository } from 'typeorm';
import { boardDto } from '../dto/board/board.dto';
import { Board } from '../entity/board.entity'
import { User } from '../entity/user.entity';
const router = express.Router();

router.post('/create', async(req: express.Request, res:express.Response) => {
    const id = res.locals.jwtPayload.userId;
    
    const boardRepository = getRepository(Board);
    let user = await boardRepository.findOneOrFail({where: {id:id}})

    let {title, description}:boardDto = req.body;
    let board = new Board();
    
    board.title = title;
    board.description = description;
    board = user; // 수정 해야할 부분

    try {
        await boardRepository.save(board);
    } catch (e) {
        res.status(400).send("게시판 작성에 실패하셨습니다.")
        return;
    }
    res.status(200).send("게시판 작성 성공")
})

router.get('/find', async(req:express.Request, res:express.Response) => {
    const boardRepository = getRepository(Board);

    const board = boardRepository.find();

    if(!board) {
        res.status(400).send();
        return;
    }
    res.send(board)
})

router.get('/findone', async(req:express.Request, res:express.Response) => {
    const id = res.locals.jwtPayload.userId;
    const boardRepository = await getRepository(Board);

    let user = await boardRepository.findOneOrFail({where: {id:id}})

    return await boardRepository
    .createQueryBuilder('board')
    .where('board.userId = :userId', {userId: user.id})
    .getMany();
})

router.put('/update/:id', async(req:express.Request, res:express.Response) => {
    const id = req.params.id;
    let {title, description} = req.body;

    const boardRepository = getRepository(Board);
    const board = await boardRepository.findOneOrFail({ where: {id} })

    board.title = title;
    board.description = description;

    try {
        await boardRepository.save(board);
    } catch (e) {
        res.status(400).send()
        return;
    }
    res.status(200).send("수정 성공")
})

router.delete('/delete/:id', async(req:express.Request, res: express.Response) => {
    const id = req.params.id;
    const boardRepository = getRepository(Board);

    const board = await boardRepository.findOneOrFail({ where: {id} });

    try {
        await boardRepository.delete(board);
    } catch (e) {
        res.status(400).send()
        return;
    }
    res.status(200).send("삭제 성공")
})
export default router