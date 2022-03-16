import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./user/entity/user.entity";
import * as express from 'express';
import * as bodyParser from 'body-parser';
const app = express()

import router from './user/user'

createConnection().then(async connection => {
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())

    app.use('/user', router);
    
    console.log('connect..')
    app.listen(3000)
}).catch(error => console.log(error));

export default app