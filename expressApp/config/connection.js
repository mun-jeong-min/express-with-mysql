const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const connect = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})
connect.connect()