const express = require('express');
const router = express.Router();

const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})
connection.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query('INSERT INTO tsa VALUES(122)', (err,results,fields) => {
    if(err) {
      console.log(err)
      console.log(results)
      console.log(fields)
    }
  })
  res.send('respond with a resource');
});

module.exports = router;