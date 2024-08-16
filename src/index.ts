import inquirer from 'inquirer';
import { pool, connectToDb } from './connection.js';
import chalk from 'chalk';

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
        case 'Delete Department':
            deleteDepartment();
            break;
        case 'Quit':
            process.exit(0);
    }
}
    
// Create a viewAllEmployees method - This Method logs a table of all employee specific data
const viewAllEmployees = async (): Promise<void> => {
    const sql = `SELECT * FROM employees`;
    // A variable for holding the objects retrieved by the sql code
    const res = await pool.query(sql);
    // Uses the "Chalk" package to create different colored text within the Command-Line Interface
    console.log(chalk.whiteBright('Employees:'));
    // Creates a table using the objects retrieved within the res variable
    console.table(res.rows);
    // Re-initializes the init function so the user can make another choice
    init();
}

// Create a viewAllRoles method - This Method logs a table of all roles specific data - Refer to viewAllEmployees
const viewAllRoles = async (): Promise<void> => {
    const sql = `SELECT * FROM roles`;
    const res = await pool.query(sql);
    console.log(chalk.whiteBright('Roles:'));
    console.table(res.rows);
    init();
}

// Create a viewAllDepartments method - This Method logs a table of all department specific data
const viewAllDepartments = async (): Promise<void> => {
    const sql = `SELECT * FROM departments`;
    const res = await pool.query(sql);
    console.log(chalk.greenBright('Departments:'));
    console.table(res.rows);
    init();
}

// Create an addEmployee method - This Method adds an employee to the employees table
const addEmployee = async (): Promise<void> => {
    
}
    
// Create an addRole method - This Method adds a Role to the roles table
const addRole = async (): Promise<void> => {
    // Destructures and stores the objects returned by pool.query in a variable
    const { rows } = await pool.query(`SELECT id, name FROM departments`);
    // Stores an array of objects built using the .map() method - Each object has a "value" and a "name"
    const departmentList = rows.map((department: any) => ({value: department.id, name: department.name}));
    // An array that holds information in objects for each question
    const questions = [
        {name: 'roleName', type: 'input', message: 'What is the name of the role?'}, 
        {name: 'roleSalary', type: 'input', message: 'What is the salary of the role?'}, 
        {name: 'departmentName', type: 'list', message: 'Which department does the role belong to?', choices: departmentList}];
    // A variable to hold all responses (answers) from the inquirer prompts
    const answers = await inquirer.prompt(questions);
    // Adds the role that was created by the user from answering the prompt questions
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)`;
    // Initializes the sql code with the data given by the user
    await pool.query(sql, [answers.roleName, answers.roleSalary, answers.departmentName]);
    // Statement to tell the user that their role has been added
    console.log(`Added ${answers.roleName} to the database`);
    // Retrieves the new information from the departments table and logs it to the console formatted as a table
    const newTable = await pool.query(`SELECT * FROM roles`);
    console.table(newTable.rows);
    // Re-initializes the init function so the user can make another choice
    init();
}
    
// Create an addDepartment method - This Method adds a department to the departments table - Refer to addRole
async function addDepartment() {
    const questions = [{name: 'departmentName', type: 'input', message: 'What is the name of the department?'}];
    const answer = await inquirer.prompt(questions);

    const sql = `INSERT INTO departments (name) VALUES ($1)`;
    await pool.query(sql, [answer.departmentName]);

    console.log(`Added ${answer.departmentName} to the database`);

    const newTable = await pool.query(`SELECT * FROM departments`);
    console.table(newTable.rows);
    init();
}

// Create an updateEmployeeRole method - This Method updates an existing employee on the employees table
const updateEmployeeRole = async (): Promise<void> => {
    
}

// Create a deleteDepartment method - This method deletes a department from the departments table
async function deleteDepartment() {
    const { rows } = await pool.query(`SELECT id, name FROM departments`);
    const departmentList = rows.map((department: any) => ({value: department.id, name: department.name}));

    const questions = [{name: 'departmentName', type: 'list', message: 'Which department would you like to delete?', choices: departmentList}];

    const answer = await inquirer.prompt(questions);

    const deletedDepartment = departmentList.find(department => department.value === answer.departmentName)?.name;

    const sql = `DELETE FROM departments WHERE id = $1`;
    await pool.query(sql, [answer.departmentName]);
    console.log(`Deleted ${deletedDepartment} from the database`);

    const newTable = await pool.query(`SELECT * FROM departments`);
    console.table(newTable.rows);
    init();
}

init();