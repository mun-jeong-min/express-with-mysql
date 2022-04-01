import { getRepository } from "typeorm"
import { User } from "../../entity/user/user.entity"

export const profilePrint = async(req,res) => {
    const id = res.locals.jwtPayload.userId;
    
    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail({where:{id:id}})

    if(!user) {
        res.status(404).send()
        return;
    }

    res.status(200).send(user);
}

export const profileUpdate = async(req,res) => {
    const id = req.params.id;
}

export default {profilePrint,profileUpdate}