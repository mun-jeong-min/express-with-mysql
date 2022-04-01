import { getRepository } from "typeorm"
import { Profile } from "../../entity/profile/profile.entity";
import { User } from "../../entity/user/user.entity"

export const profilePrint = async(req,res) => {
    const id = res.locals.jwtPayload.userId;
    const idP = req.params.id;

    const userRepository = getRepository(User);
    const profileRepository = getRepository(Profile);

    const profile = await profileRepository.findOneOrFail({where:{id:idP}})
    const user = await userRepository.findOneOrFail({where:{id:id}})

    profile.name = user.name

    if(!user) {
        res.status(404).send()
        return;
    }

    res.status(200).send(profile);
}

export const profileUpdate = async(req,res) => {
    const id = req.params.id;
    let {name} = req.body;

    const profileRepository = getRepository(Profile)
    const profile = await profileRepository.findOneOrFail({where:{id:id}})

    if(!profile) {
        res.status(404).send();
    }

    profile.name = name;

    await profileRepository.save(profile);

    res.status(200).send();
}

export default {profilePrint,profileUpdate}