import inquirer from 'inquirer';
import { pool, connectToDb } from './connection.js';
// Waits to initialize the program until the database has been connected from connection.js
await connectToDb();
// Initialization function - Prompts the user for what to do in the program
async function init() {
    // Variable to hold the choice the user has made
    const answers = await inquirer.prompt({
        name: 'actions',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'View All Roles',
            'View All Departments',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Update Employee Role',
            'Delete Employee',
            'Delete Role',
            'Delete Department',
            'Quit'
        ]
    });
    // Uses the answers variable to run a function based on what was chosen
    switch (answers.actions) {
        case 'View All Employees':
            viewAllEmployees();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Update Employee Role':
            updateEmployeeRole();
            break;
        case 'View All Roles':
            viewAllRoles();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'Delete Employee':
            deleteEmployee();
            break;
        case 'Delete Role':
            deleteRole();
            break;
        case 'Delete Department':
            deleteDepartment();
            break;
        case 'Quit':
            process.exit(0);
    }
}
// Create a viewAllEmployees method - This Method logs a table of all employee specific data
const viewAllEmployees = async () => {
    // Uses SQL to select and join different tables for viewing purposes
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary,
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager  
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN employees manager ON employees.manager_id = manager.id
                LEFT JOIN departments ON roles.department_id = departments.id`;
    // A variable for holding the objects retrieved by the sql code
    const res = await pool.query(sql);
    // Creates a table using the objects retrieved within the res variable
    console.table(res.rows);
    // Re-initializes the init function so the user can make another choice
    init();
};
// Create a viewAllRoles method - This Method logs a table of all roles specific data - Refer to viewAllEmployees
const viewAllRoles = async () => {
    const sql = `SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id`;
    const res = await pool.query(sql);
    console.table(res.rows);
    init();
};
// Create a viewAllDepartments method - This Method logs a table of all department specific data - Refer to viewAllEmployees
const viewAllDepartments = async () => {
    const sql = `SELECT * FROM departments`;
    const res = await pool.query(sql);
    console.table(res.rows);
    init();
};
// Create an addEmployee method - This Method adds an employee to the employees table
const addEmployee = async () => {
    // Destructures and stores the objects returned by pool.query in a variable
    const { rows: roleRows } = await pool.query(`SELECT id, title FROM roles`);
    const { rows: managerRows } = await pool.query(`SELECT id, first_name, last_name FROM employees WHERE manager_id IS NULL`);
    // Stores an array of objects built using the .map() method - Each object has a "value" and a "name"
    const roleList = roleRows.map((role) => ({ value: role.id, name: role.title }));
    const managerList = managerRows.map((manager) => ({ value: manager.id, name: `${manager.first_name} ${manager.last_name}` }));
    // An array that holds information in objects for each question
    const questions = [
        { name: 'employeeFirstName', type: 'input', message: `What is the employee's first name?` },
        { name: 'employeeLastName', type: 'input', message: `What is the employee's last name?` },
        { name: 'employeeRole', type: 'list', message: `What is the employee's role?`, choices: roleList },
        { name: 'employeeManager', type: 'list', message: `Who is the employee's manager?`, choices: managerList }
    ];
    // An array that holds information in objects for each question
    const answers = await inquirer.prompt(questions);
    // Adds the role that was created by the user from answering the prompt questions
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
    // Initializes the sql code with the data given by the user
    await pool.query(sql, [answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager]);
    // Statement to tell the user that their role has been added
    console.log(`Added ${answers.employeeFirstName} ${answers.employeeLastName} to the database`);
    // Re-initializes the init function so the user can make another choice
    init();
};
// Create an addRole method - This Method adds a Role to the roles table - Refer to addEmployee
const addRole = async () => {
    const { rows } = await pool.query(`SELECT id, name FROM departments`);
    const departmentList = rows.map((department) => ({ value: department.id, name: department.name }));
    const questions = [
        { name: 'roleName', type: 'input', message: 'What is the name of the role?' },
        { name: 'roleSalary', type: 'input', message: 'What is the salary of the role?' },
        { name: 'departmentName', type: 'list', message: 'Which department does the role belong to?', choices: departmentList }
    ];
    const answers = await inquirer.prompt(questions);
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)`;
    await pool.query(sql, [answers.roleName, answers.roleSalary, answers.departmentName]);
    console.log(`Added ${answers.roleName} to the database`);
    init();
};
// Create an addDepartment method - This Method adds a department to the departments table - Refer to addEmployee
async function addDepartment() {
    const questions = [{ name: 'departmentName', type: 'input', message: 'What is the name of the department?' }];
    const answer = await inquirer.prompt(questions);
    const sql = `INSERT INTO departments (name) VALUES ($1)`;
    await pool.query(sql, [answer.departmentName]);
    console.log(`Added ${answer.departmentName} to the database`);
    init();
}
// Create an updateEmployeeRole method - This Method updates an existing employee on the employees table
const updateEmployeeRole = async () => {
    // Two variables, employeeRows and roleRows to hold specific data
    const { rows: employeeRows } = await pool.query(`SELECT id, first_name, last_name FROM employees`);
    const { rows: roleRows } = await pool.query(`SELECT id, title FROM roles`);
    // Two variables to hold new object arrays for both employees and roles
    const employeeList = employeeRows.map((employee) => ({ value: employee.id, name: `${employee.first_name} ${employee.last_name}` }));
    const roleList = roleRows.map((role) => ({ value: role.id, name: role.title }));
    // An array that holds information in objects for each question
    const questions = [
        { name: 'employeeName', type: 'list', message: `Which employee's role do you want to update?`, choices: employeeList },
        { name: 'employeeRole', type: 'list', message: 'Which role do you want to assign the selected employee?', choices: roleList }
    ];
    // An array that holds information in objects for each question
    const answers = await inquirer.prompt(questions);
    // A variable to hold the name of which employee the user chose to update
    const selectedEmployee = employeeList.find(employee => employee.value === answers.employeeName)?.name;
    // Uses SQL to update the employee's role based on the id (employee chosen)
    const sql = `UPDATE employees SET role_id = $2 WHERE id = $1`;
    await pool.query(sql, [answers.employeeName, answers.employeeRole]);
    console.log(`Updated ${selectedEmployee}'s role'`);
    init();
};
// Create a deleteEmployee method - This method deletes an employee from the employee table
async function deleteEmployee() {
    // Selects the query.rows id, and name from departments as a variable called rows.
    const { rows } = await pool.query(`SELECT id, first_name, last_name FROM employees`);
    // Stores an array of objects built using the .map() method - Each object has a "value" and a "name"
    const employeeList = rows.map((employee) => ({ value: employee.id, name: `${employee.first_name} ${employee.last_name}` }));
    // Variable to hold the question and response
    const questions = [{ name: 'employeeName', type: 'list', message: 'Which employee would you like to delete?', choices: employeeList }];
    const answer = await inquirer.prompt(questions);
    // Variable to hold the name of the department before deletion
    const deletedEmployee = employeeList.find(employee => employee.value === answer.employeeName)?.name;
    // SQL statement to delete the department that the user chose
    const sql = `DELETE FROM employees WHERE id = $1`;
    await pool.query(sql, [answer.employeeName]);
    console.log(`Deleted ${deletedEmployee} from the database`);
    // Re-initializes the init function so the user can make another choice
    init();
}
// // Create a deleteRole method - This method deletes a role from the employee table - Refer to deleteEmployee
async function deleteRole() {
    const { rows } = await pool.query(`SELECT id, title FROM roles`);
    const roleList = rows.map((role) => ({ value: role.id, name: role.title }));
    const questions = [{ name: 'roleTitle', type: 'list', message: 'Which role would you like to delete?', choices: roleList }];
    const answer = await inquirer.prompt(questions);
    const deletedRole = roleList.find(role => role.value === answer.roleTitle)?.name;
    const sql = `DELETE FROM roles WHERE id = $1`;
    await pool.query(sql, [answer.roleTitle]);
    console.log(`Deleted ${deletedRole} from the database`);
    init();
}
// Create a deleteDepartment method - This method deletes a department from the departments table - Refer to deleteEmployee
async function deleteDepartment() {
    const { rows } = await pool.query(`SELECT id, name FROM departments`);
    const departmentList = rows.map((department) => ({ value: department.id, name: department.name }));
    const questions = [{ name: 'departmentName', type: 'list', message: 'Which department would you like to delete?', choices: departmentList }];
    const answer = await inquirer.prompt(questions);
    const deletedDepartment = departmentList.find(department => department.value === answer.departmentName)?.name;
    const sql = `DELETE FROM departments WHERE id = $1`;
    await pool.query(sql, [answer.departmentName]);
    console.log(`Deleted ${deletedDepartment} from the database`);
    init();
}
init();
