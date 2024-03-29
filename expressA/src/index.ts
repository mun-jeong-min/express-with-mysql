import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from 'express';
import * as bodyParser from 'body-parser';
const app = express()

import * as cors from 'cors'
import apiRouter from './router/index'

createConnection().then(async connection => {
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
    app.use(cors())

    app.set('view engine', 'ejs')
    app.use(express.static(__dirname + '/'))

    app.use('/', apiRouter);

    app.get('/', async(req,res) => {
        res.render("as")
    })
    console.log('connect..')
    app.listen(3000)
}).catch(error => console.log(error));

export default app