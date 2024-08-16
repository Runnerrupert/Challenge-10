import inquirer from 'inquirer';
import { pool, connectToDb } from './connection.js';
import { QueryResult } from 'pg';
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
        case 'Quit':
            process.exit(0);
    }
}
    
    // Create a viewAllEmployees method
const viewAllEmployees = async (): Promise<void> => {
    init();
}    

    // Create an addEmployee method
const addEmployee = async (): Promise<void> => {
    init();
}
    
    // Create an updateEmployeeRole method
const updateEmployeeRole = async (): Promise<void> => {
    init();
}
    
    // Create a viewAllRoles method
const viewAllRoles = async (): Promise<void> => {
    init();
}
    
    // Create an addRole method
const addRole = async (): Promise<void> => {
    init();
}
    
    // Create a viewAllDepartments method
const viewAllDepartments = async (): Promise<void> => {
    init();
}
    
    // Create an addDepartment method
const addDepartment = async (): Promise<void> => {
    init();
}

init();