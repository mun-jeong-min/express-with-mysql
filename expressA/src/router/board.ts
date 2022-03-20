import * as express from 'express'
import { getRepository } from 'typeorm';
import { boardDto } from '../entity/board/dto/board.dto';
import { Board } from '../entity/board/board.entity'
import { User } from '../entity/user/user.entity';
import { Comment } from '../entity/comment/comment.entity';
const router = express.Router();

router.post('/create', async(req: express.Request, res:express.Response) => {
    const id = res.locals.jwtPayload.userId;
    
    const boardRepository = getRepository(Board);
    const userRepository = getRepository(User);
    const commentRepository = getRepository(Comment);

    let user = await userRepository.findOneOrFail({ where: {id:id} })
    let comment = await commentRepository.find({where: {userId: id}})

    let {title, description}:boardDto = req.body;
    let board = new Board();
    
    board.title = title;
    board.description = description;
    board.user = user;
    board.comment = comment;
    
    try {
        await boardRepository.save(board);
    } catch (e) {
        res.status(400).send("게시판 작성에 실패하셨습니다.")
        return;
    }
    res.status(201).send("게시판 작성 성공")
})

router.get('/find', async(req:express.Request, res:express.Response) => {
    const boardRepository = getRepository(Board);

    const board = await boardRepository.find();

    if(!board) {
        res.status(400).send();
        return;
    }
    res.status(200).send(board)
})

router.get('/findone', async(req:express.Request, res:express.Response) => {
    const id = res.locals.jwtPayload.userId;
    const boardRepository = await getRepository(Board);
    const userRepository = await getRepository(User);

    let user = await userRepository.findOneOrFail({where: {id:id}})

    const boards = await boardRepository
    .createQueryBuilder('board')
    .where('board.userId = :userId', {userId: user.id})
    .getMany();

    res.status(200).send(boards)
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
    res.status(201).send("수정 성공")
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