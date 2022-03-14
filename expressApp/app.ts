import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import { createConnection } from 'typeorm';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;