const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chickennugget1',
    database: 'employee_db',
    port: 3001
  });