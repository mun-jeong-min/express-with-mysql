import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./user/entity/user.entity";
import * as express from 'express';
import * as bodyParser from 'body-parser';
const app = express()

import router from './user/user'

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/user', router);

createConnection().then(async connection => {
    console.log('connect..')
}).catch(error => console.log(error));

app.listen(3000)
export default app