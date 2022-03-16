import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./user/entity/user.entity";
import * as express from 'express';
import * as bodyParser from 'body-parser';
const app = express()

import userRouter from './user/user'
import boardRouter from './board/board'
import { tokenCheck } from "./middleware/jwtCheck";

createConnection().then(async connection => {
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())

    app.use('/user', userRouter);
    app.use('/board', [tokenCheck] ,boardRouter);
    
    console.log('connect..')
    app.listen(3000)
}).catch(error => console.log(error));

export default app