import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./user/entity/User";

createConnection().then(async connection => {
    console.log('start')
}).catch(error => console.log(error));