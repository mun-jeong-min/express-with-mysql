import * as express from 'express'
import { getRepository } from 'typeorm';
import { boardDto } from '../entity/board/dto/board.dto';
import { Board } from '../entity/board/board.entity'
import { User } from '../entity/user/user.entity';
import { Comment } from '../entity/comment/comment.entity';
import * as multer from 'multer'
import storage from '../middleware/imageCheck';
const router = express.Router();

const upload = multer({storage:storage})

router.post('/create', upload.single('image'), async(req: express.Request, res:express.Response) => {   
    const id = res.locals.jwtPayload.userId;
    
    const boardRepository = getRepository(Board);
    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail({ where: {id:id} })

    let {title, description}:boardDto = req.body;
    let board = new Board();
    
    board.title = title;
    board.description = description;
    board.user = user;
    board.image = `/images/${req.file.filename}`

    try {
        await boardRepository.save(board);
    } catch (e) {    
        res.status(400).send("게시판 작성에 실패하셨습니다.")
        return;
    }
    res.status(201).redirect("board/find")
})

router.get('/find', async(req:express.Request, res:express.Response) => {
    const boardRepository = getRepository(Board);

    try {
        const board = await boardRepository.find();
        res.status(200).send(board);   
    } catch (e) {
        res.status(400).send();
        return;
    }
})

router.get('findOne/:id', async(req:express.Request, res:express.Response) => {
    const id = req.params.id;

    const boardRepository = getRepository(Board);
    const board = await boardRepository.findOne({where: {id:id}});

    res.status(200).send(board);
})

router.get('/findMine', async(req:express.Request, res:express.Response) => {
    const id = res.locals.jwtPayload.userId;

    const boardRepository = getRepository(Board);
    const userRepository = getRepository(User);

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
    res.status(201).redirect("board/find")
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
    res.status(200).redirect("board/find")
})
export default router