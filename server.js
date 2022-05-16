// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Creates the connection using your user and password from the mysql database
const con = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Chickennugget1',
  database: 'employee_db'
});


// Connectes 'con' to the database if successful, if not throw err
con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
  startApp();
});


// Initiating Prompts
function startApp() {
  return inquirer
    .prompt([
      {
        type: 'list',
        message: 'Pick an option!',
        name: 'choices',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add an employee',
          'Add a department',
          'Add a role',
          'Update an employee role',
          'Exit'
        ]
      },
    ])


    // This Displays selected prompt in table
    .then(function (answer) {
      if (answer.choices === 'View all departments') {openDepartment();}
      if (answer.choices === 'View all roles') {openRoles();}
      if (answer.choices === 'View all employees') {openEmployees();}
      if (answer.choices === 'Add an employee') {addEmployee();}
      if (answer.choices === 'Add a department') {addDepartment();}
      if (answer.choices === 'Add a role') {addRole();}
      if (answer.choices === 'Update an employee role') {updateEmployee();}
      if (answer.choices === 'Exit') console.log('SEE YA!'); {con.end();}
    });
};


// This function Opens department table
function openDepartment() {
  con.query(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.log(err);
    };
    // Displays tabel
    console.table(results);
    startApp();
  });
};


// This function Opens employee table
function openEmployees() {
  con.query(`SELECT * FROM employee`, function (err, results) {
    if (err) {
      console.log(err);
    };
    // Displays tabel
    console.table(results);
    startApp();
  });
};


// This function Opens role table
function openRoles() {
  con.query(`SELECT * FROM role`, function (err, results) {
    if (err) {
      console.log(err);
    };
    // Displays tabel
    console.table(results);
    startApp();
  });
};


// This function Adds new department
function addDepartment() {
  inquirer.prompt(
    [
      {
        message: 'Enter the new department',
        name: 'dept_name'
      }
    ]
  ).then((answers) => {
    con.query(`INSERT INTO department (dept_name) VALUES (?)`,
      [answers.dept_name],
      (err, results) => {
        startApp();
      }
    );
  });
}


// This function Adds new role
function addRole() {
  con.query(`SELECT id AS value, dept_name AS name FROM department`, (err, departments) => {
    if (err) console.log(err);
    inquirer.prompt(
      [
        {
          message: 'Enter the role',
          name: 'title'
        },
        {
          message: 'Enter the salary',
          name: 'salary'
        },
        {
          message: 'Choose the department',
          type: 'list',
          name: 'dept',
          choices: departments
        },
      ]
    ).then((answers) => {
      con.query(
        'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',
        [answers.title, answers.salary, answers.dept],
        (err, results) => {
          if (err) console.log(err);
          console.log(answers);
          startApp();
        }
      );
    }
    )
  });
}


// This function Adds new employee
function addEmployee() {
  con.query('SELECT id AS value, title AS name FROM role', (err, roles) => {
    if (err) console.log(err);
    inquirer.prompt(
      [
        {
          message: 'Enter first name:',
          name: 'first_name'
        },
        {
          message: 'Enter last name:',
          name: 'last_name'
        },
        {
          message: 'Choose role',
          type: 'list',
          name: 'role',
          choices: roles
        },
      ]
    ).then((answers) => {
      con.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)`,
        [answers.first_name, answers.last_name, answers.role],
        (err, results) => {
          if (err) console.log(err);
          console.log(answers);
          startApp();
        }
      );
    })
  });
}


// This function updates employees
function updateEmployee() {
  var roleResults;
  con.query(
      `SELECT id AS value, title AS name FROM role`, (err, roles) => {
          if (err) {
              console.log(err)
              return;
          }
          roleResults = roles;
      });
  con.query(
      `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`, (err, employees) => {
          if (err) console.log(err);
          inquirer.prompt(
            [
                {
                    message: 'Choose the employee',
                    type: 'list',
                    name: 'employees',
                    choices: employees
                },
                {
                    message: 'Choose the new role',
                    type: 'list',
                    name: 'role',
                    choices: roleResults
                },
            ]
          ).then((answers) => {
              var employeeName = answers.employees.split(' ');
              var employeeFirstName = employeeName[0];
              var employeeLastName = employeeName[employeeName.length - 1];

              con.query(
                  'UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?',
                  [answers.role, employeeFirstName, employeeLastName],
                  (err, results) => {
                      if (err) console.log(err);
                      console.log(results);
                      startApp();
                  }
                );
              }
             )
            });
        };