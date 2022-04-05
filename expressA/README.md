# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

error 1.
mysql ER_NOT_SUPPORT_AUTH_MODE: Client does not support authentication protocol requestd by server; consider upgrading MySQL client 에러

mysql 접속후
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '사용할패스워드'
입력하니 고쳐짐