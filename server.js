const mysql = require('mysql2');
const inquirer = require('inquirer');

// Creates the connection using your user and password from the mysql database
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chickennugget1',
    database: 'employee_db',
    port: 3001
  });

// Connectes 'con' to the database if successful, if not throw err
con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
  startApp();
});

function startApp() {
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'toDo',
      message: 'Pick an option!',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
      ],
    },
  ])
  .then((answer) => {
    if(answer.toDo === 'View all departments') {
      viewALLDepartments();
    } else if(answer.toDo === 'Viw all roles') {
      viewAllRoles();
    } else if(answer.toDo === 'View all employees') {
      viewAllEmployees();
    } else if(answer.toDo === 'Add a department') {
      addADepartment();
    } else if(answer.toDo === 'Add a role') {
      addARole();
    } else if(answer.toDo === 'Add an employee') {
      addAnEmployee();
    } 
  })
};


startApp();
