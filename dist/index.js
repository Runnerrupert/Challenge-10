// import inquirer from 'inquirer';
import { pool, connectToDb } from './connection.js';
// Create a Cli Class
await connectToDb();
pool.query('SELECT * FROM employees', (err, result) => {
    if (err) {
        console.log(err);
    }
    else if (result) {
        console.log(result.rows);
    }
});
// class CLI {
//     // departments = 
//     // roles = 
//     // employees = 
//     // Create an addEmployee method
//     addEmployee() {
//         inquirer
//             .prompt([
//                 {
//                     type: 'input',
//                     name: 'firstName',
//                     message: 'What is their First Name?',
//                 },
//                 {
//                     type: 'input',
//                     name: 'lastName',
//                     message: 'What is their Last Name?',
//                 },
//                 {
//                 }
//             ])
//     }
//     // Create an updateEmployeeRole method
//     updateEmployeeRole() {
//     }
//     // Create a viewAllRoles method
//     viewAllRoles() {
//     }
//     // Create an addRole method
//     addRole() {
//         inquirer
//             .prompt([
//                 {
//                     type: 'input',
//                     name: 'roleName',
//                     message: 'What is the name of the role?',
//                 },
//                 {
//                     type: 'input',
//                     name: 'roleSalary',
//                     message: 'What is the salary of the role?',
//                 },
//                 {
//                     type: 'rawlist',
//                     name: 'departments',
//                     message: 'Which department does the role belong to?',
//                     choices: [departments],
//                 }
//             ])
//     }
//     // Create a viewAllDepartments method
//     viewAllDepartments() {
//     }
//     // Create an addDepartment method
//     addDepartment() {
//     }
// }
