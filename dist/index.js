import inquirer from 'inquirer';
import { pool, connectToDb } from './connection.js';
import chalk from 'chalk';
await connectToDb();
async function init() {
    const answers = await inquirer.prompt({
        name: 'actions',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Delete Department',
            'Quit'
        ]
    });
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
// Create a viewAllEmployees method
const viewAllEmployees = async () => {
    const sql = `SELECT * FROM employees`;
    const res = await pool.query(sql);
    console.log(chalk.greenBright('Employees:'));
    console.table(res.rows);
    init();
};
// Create an addEmployee method
const addEmployee = async () => {
};
// Create an updateEmployeeRole method
const updateEmployeeRole = async () => {
    init();
};
// Create a viewAllRoles method
const viewAllRoles = async () => {
    const sql = `SELECT * FROM roles`;
    const res = await pool.query(sql);
    console.log(chalk.greenBright('Roles:'));
    console.table(res.rows);
    init();
};
// Create an addRole method
const addRole = async () => {
    init();
};
// Create a viewAllDepartments method
const viewAllDepartments = async () => {
    const sql = `SELECT * FROM departments`;
    const res = await pool.query(sql);
    console.log(chalk.greenBright('Departments:'));
    console.table(res.rows);
    init();
};
// Create an addDepartment method
async function addDepartment() {
    const questions = [{ name: 'departmentName', type: 'input', message: 'What is the name of the department?' }];
    const answer = await inquirer.prompt(questions);
    const sql = `INSERT INTO departments (name) VALUES ($1)`;
    const res = await pool.query(sql, [answer.departmentName]);
    console.log(`Added ${answer.departmentName} to the database`);
    console.table(res.rows);
    init();
}
// Create a deleteDepartment method
async function deleteDepartment() {
    const { rows } = await pool.query(`SELECT id, name FROM departments`);
    const departmentList = rows.map((department) => ({ value: department.id, name: department.name }));
    const questions = [{ name: 'departmentName', type: 'list', message: 'Which department would you like to delete?', choices: departmentList }];
    const answer = await inquirer.prompt(questions);
    console.log(rows);
    console.log(departmentList);
    console.log(answer);
    const sql = `DELETE FROM departments WHERE id = $1`;
    await pool.query(sql, [answer.departmentName]);
    console.log(`Deleted from the database`);
    const newTable = await pool.query(`SELECT * FROM departments`);
    console.table(newTable.rows);
    init();
}
init();
