import { getRepository } from "typeorm"
import { groupDto } from "../entity/group/dto/group.dto";
import { Group } from "../entity/group/group.entity"
import { User } from "../entity/user/user.entity";

export const groupCreate = async(req,res) => {

    let {name}:groupDto = req.body;
    const id = res.locals.jwtPayload.userId;

    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail({where: {id:id}})

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

export default {groupCreate}