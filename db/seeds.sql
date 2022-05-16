USE employee_db;

-- Departments
INSERT INTO department (id, dept_name)
VALUES

(1, 'Sales'),
(2, 'Human Resources'),
(3, 'Accounting'),
(4, 'Marketing');

-- Role
INSERT INTO `role` (dept_id, title, salary)
VALUES

(1, 'Data Specialist', 45000),
(2, 'Receptionist', 30000),
(3, 'Manager', 80000),
(4, 'Supervisor', 65000);

-- Employee
INSERT INTO employee (manager_id, first_name, last_name, role_id)
VALUES

(6, 'Luis', 'Samoa', 2),
(7, 'Anakin', 'Skywalker', 1),
(15, 'Obi', 'Wan', 3),
(4, 'Darth', 'Vader', 4);