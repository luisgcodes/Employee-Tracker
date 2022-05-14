USE employee_db;

-- Departments
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Human Recources");
INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("Marketing");

-- Role
INSERT INTO role (title, salary, department_id) VALUES ("Data Specialist", 200, 8);
INSERT INTO role (title, salary, department_id) VALUES ("Receptionist", 100, 6);
INSERT INTO role (title, salary, department_id) VALUES ("Manager", 80, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Supervisor", 100, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Developer", 200, 1);

-- Employee
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Luis", "Samoa", 5);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("The", "Rock", 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Anakin", "Skywalker", 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Obi", "Wan",2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Darth", "Vader", 1);