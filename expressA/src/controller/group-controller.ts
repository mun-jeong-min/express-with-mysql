import { getRepository, Repository } from "typeorm"
import { groupDto } from "../entity/group/dto/group.dto";
import { Group } from "../entity/group/group.entity"
import { User } from "../entity/user/user.entity";

export const groupCreate = async(req,res) => {

    let {name}:groupDto = req.body;
    const id = res.locals.jwtPayload.userId;

    const userRepository = getRepository(User);
    const user = await userRepository.find({where: {id:id}})

    if(!user) {
        res.status(404).send('not found')
        return;
    }
    
    const groupRepository = getRepository(Group)
    let group = new Group();

    group.name = name;
    group.user = user;
    
    await groupRepository.save(group);
    
    res.status(200).send('group create')
}

export const groupFind = async(req,res) => {
    const id = res.locals.jwtPayload.userId;
    
    const groupRepository = getRepository(Group)

    const groups = await groupRepository.findOneOrFail({where:{id:id}})

    if(!groups){
        res.status(404).send("그룹을 찾을 수 없음")
        return;
    }
    res.status(200).send(groups);
}

export const groupDelete = async(req,res) => {
    const id = req.params.id;

    const groupRepository = getRepository(Group);
    
    const group = await groupRepository.findOneOrFail({where:{id:id}})

    if(!group){
        res.status(404).send()
        return;
    }

    await groupRepository.delete(group)

    res.status(200).send("삭제 성공")
}

export default {groupCreate,groupFind, groupDelete}