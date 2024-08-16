import inquirer from 'inquirer';
import { pool, connectToDb } from './connection.js';
import { QueryResult } from 'pg';

await connectToDb();

class Cli {
    exit: boolean = false;

    init = async (): Promise<void> => {
        await inquirer
            .prompt(
                {   
                    name: 'actions',
                    type: 'list',
                    message: 'What would you like to do?',
                    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
                }
            ) .then ((answers) => {
                if (answers.actions === 'View All Employees') {
                    this.viewAllEmployees().then(() => this.init());
                } else if (answers.actions === 'Add Employee') {
                    this.addEmployee().then(() => this.init());
                } else if (answers.actions === 'Update Employee Role') {
                    this.updateEmployeeRole().then(() => this.init());
                } else if (answers.actions === 'View All Roles') {
                    this.viewAllRoles().then(() => this.init());
                } else if (answers.actions === 'Add Role') {
                    this.addRole().then(() => this.init());
                } else if (answers.actions === 'View All Departments') {
                    this.viewAllDepartments().then(() => this.init());
                } else if (answers.actions === 'Add Department') {
                    this.addDepartment().then(() => this.init());
                } else if (answers.actions === 'Quit') {
                    process.exit(0);
                }
            }) 
    }
    
    // Create a viewAllEmployees method
    viewAllEmployees = async (): Promise<void> => {
        
    }
    
    // Create an addEmployee method
    addEmployee = async (): Promise<void> => {
        
    }
    
    // Create an updateEmployeeRole method
    updateEmployeeRole = async (): Promise<void> => {
    
    }
    
    // Create a viewAllRoles method
    viewAllRoles = async (): Promise<void> => {
    
    }
    
    // Create an addRole method
    addRole = async (): Promise<void> => {
        
    }
    
    // Create a viewAllDepartments method
    viewAllDepartments = async (): Promise<void> => {

    }
    
    // Create an addDepartment method
    addDepartment = async (): Promise<void> => {
    
    }
}

const cli = new Cli();

cli.init();