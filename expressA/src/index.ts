import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from 'express';
import * as bodyParser from 'body-parser';
const app = express()

import * as cors from 'cors'
import userRouter from './router/user'
import boardRouter from './router/board'
import { tokenCheck } from "./middleware/jwtCheck";

createConnection().then(async connection => {
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
    app.use(cors())

    app.use('/user', userRouter);
    app.use('/board', boardRouter);
    
    console.log('connect..')
    app.listen(3000)
}).catch(error => console.log(error));

export default app