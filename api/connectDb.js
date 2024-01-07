import mysql from 'mysql2';


export const db = mysql.createConnection({
    host: 'localhost',
    user: 'Slavi',
    password: 'Slavidev123',
    database: 'social'
})