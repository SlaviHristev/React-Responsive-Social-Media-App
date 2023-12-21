import mysql from 'mysql2';


export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Slavidev123',
    database: 'socia media appl'
})