import inquirer from 'inquirer';
import { connectToDb } from './connection.js';
await connectToDb();
class Cli {
    constructor() {
        Object.defineProperty(this, "exit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "init", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                await inquirer
                    .prompt({
                    name: 'actions',
                    type: 'list',
                    message: 'What would you like to do?',
                    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
                }).then((answers) => {
                    if (answers.actions === 'View All Employees') {
                        this.viewAllEmployees().then(() => this.init());
                    }
                    else if (answers.actions === 'Add Employee') {
                        this.addEmployee().then(() => this.init());
                    }
                    else if (answers.actions === 'Update Employee Role') {
                        this.updateEmployeeRole().then(() => this.init());
                    }
                    else if (answers.actions === 'View All Roles') {
                        this.viewAllRoles().then(() => this.init());
                    }
                    else if (answers.actions === 'Add Role') {
                        this.addRole().then(() => this.init());
                    }
                    else if (answers.actions === 'View All Departments') {
                        this.viewAllDepartments().then(() => this.init());
                    }
                    else if (answers.actions === 'Add Department') {
                        this.addDepartment().then(() => this.init());
                    }
                    else if (answers.actions === 'Quit') {
                        process.exit(0);
                    }
                });
            }
        });
        // Create a viewAllEmployees method
        Object.defineProperty(this, "viewAllEmployees", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
            }
        });
        // Create an addEmployee method
        Object.defineProperty(this, "addEmployee", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
            }
        });
        // Create an updateEmployeeRole method
        Object.defineProperty(this, "updateEmployeeRole", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
            }
        });
        // Create a viewAllRoles method
        Object.defineProperty(this, "viewAllRoles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
            }
        });
        // Create an addRole method
        Object.defineProperty(this, "addRole", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
            }
        });
        // Create a viewAllDepartments method
        Object.defineProperty(this, "viewAllDepartments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
            }
        });
        // Create an addDepartment method
        Object.defineProperty(this, "addDepartment", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
            }
        });
    }
}
const cli = new Cli();
cli.init();
