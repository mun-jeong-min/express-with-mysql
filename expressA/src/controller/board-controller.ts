import { getRepository } from "typeorm";
import { Board } from "../entity/board/board.entity";
import { boardDto } from "../entity/board/dto/board.dto";
import { Comment } from "../entity/comment/comment.entity";
import { commentDto } from "../entity/comment/dto/comment.dto";
import { User } from "../entity/user/user.entity";

export const boardCreate = async(req,res) => {
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
}

export const boardFind = async(req,res) => {
    const boardRepository = getRepository(Board);

    try {
        const board = await boardRepository.find();
        res.status(200).send(board);   
    } catch (e) {
        res.status(404).send();
        return;
    }
}

export const findOne = async(req,res) => {
    const id = req.params.id;

    const boardRepository = getRepository(Board);
    try {
        const board = await boardRepository.findOne({where: {id:id}});
        res.status(200).send(board);   
    } catch (e) {
        res.status(404).send();
    }
}

export const findMine = async(req,res) => {
    const id = res.locals.jwtPayload.userId;

    const boardRepository = getRepository(Board);
    const userRepository = getRepository(User);

    let user = await userRepository.findOneOrFail({where: {id:id}})
    try {
        const boards = await boardRepository
        .createQueryBuilder('board')
        .where('board.userId = :userId', {userId: user.id})
        .getMany();

        res.status(200).send(boards)
    } catch (e) {
        res.status(404).send();
    }
}

export const updateBoard = async(req,res) => {
    const id = req.params.id;
    let {title, description} = req.body;

    const boardRepository = getRepository(Board);
    const board = await boardRepository.findOneOrFail({ where: {id} })

    board.title = title;
    board.description = description;

    try {
        await boardRepository.save(board);
    } catch (e) {
        res.status(409).send()
        return;
    }
    res.status(201).redirect("board/find")
}

export const deleteBoard = async(req,res) => {
    const id = req.params.id;
    const boardRepository = getRepository(Board);

    try {
        const board = await boardRepository.findOneOrFail({ where: {id} });
        await boardRepository.delete(board);
    } catch (e) {
        res.status(404).send()
        return;
    }
    res.status(200).redirect("board/find")
}

export default {boardCreate,boardFind,findOne,findMine,updateBoard,deleteBoard}