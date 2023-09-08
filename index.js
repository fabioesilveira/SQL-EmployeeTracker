const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

function mainMenu(){
    inquirer.prompt([
        {
            message: "What would you like to do?",
            type: "list",
            choices: ["Add Department", "View Departments", "Add Role", "View Roles", "Add Employee", "View Employees", "Update Employee Role"],
            name: "menu"
        }
    ])
    .then(answer => {
        if(answer.menu == "Add Department"){
            addDepartment()
        }
        if(answer.menu == "Add Role"){
            addRole()
        }
        if(answer.menu == "Add Employee"){
            addEmployee()
        }
        if(answer.menu == "View Departments"){
            viewDepartments()
        }
        if(answer.menu == "View Roles"){
            viewRoles()
        }
        if(answer.menu == "View Employees"){
            viewEmployees()
        }
        if(answer.menu == "Update Employee Role"){
            updateEmployeeRole()
        }
    })
}

function addDepartment(){
inquirer.prompt([
    {
        message: "Enter the department name",
            type: "input",
            name: "department_name"
    }
])
.then(answer => {
    db.query(`INSERT INTO department (department_name) VALUES ("${answer.department_name}")`, (err, res) => {
        if (err){
            console.log(err)
        }
        console.table(res)
        mainMenu()
    })
})
}
function addRole(){
    inquirer.prompt([
        {
            message: "Enter the title",
                type: "input",
                name: "title"
        },
        {
            message: "Enter the salary",
                type: "input",
                name: "salary"
        },
        {
            message: "Enter the department id",
                type: "input",
                name: "department_id"
        },
    ])
    .then(answer => {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answer.title}", ${answer.salary}, ${answer.department_id})`, (err, res) => {
            if (err){
                console.log(err)
            }
            console.table(res)
            mainMenu()
        })
    })
}
function addEmployee(){
    inquirer.prompt([
        {
            message: "Enter the first_name",
                type: "input",
                name: "first_name"
        },
        {
            message: "Enter the last_name",
                type: "input",
                name: "last_name"
        },
        {
            message: "Enter the role id",
                type: "input",
                name: "role_id"
        },
        {
            message: "Enter the manager id (leave blank if null)",
                type: "input",
                name: "manager_id",
        },
    ])
    .then(answer => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.first_name}","${answer.last_name}", ${answer.role_id}, ${answer.manager_id})`, (err, res) => {
            if (err){
                console.log(err)
            }
            console.table(res)
            mainMenu()
        })
    })
}
function viewDepartments(){
    db.query("SELECT * FROM department", (err, res) => {
        if (err){
            console.log(err)
        }
        console.table(res)
        mainMenu()
    })
}
function viewRoles(){
    db.query("SELECT * FROM role", (err, res) => {
        if (err){
            console.log(err)
        }
        console.table(res)
        mainMenu()
    })
}
function viewEmployees(){
    db.query("SELECT * FROM employee", (err, res) => {
        if (err){
            console.log(err)
        }
        console.table(res)
        mainMenu()
    })
}

function updateEmployeeRole() {
    db.query("SELECT * FROM employee join role where employee.role_id = role.id", (err, res) => {
        if (err){
            console.log(err)
        }
        const employees = res.map(e => e.last_name)
        console.log(employees)
        inquirer.prompt([{
            message: "pick the employee",
                type: "list",
                choices: employees,
                name: "update"
        },{
            message: "Enter the role id of the employee",
                type: "input",
                name: "updateroleid"
        }]).then( answer =>{
            const target = answer.update;
            const id = answer.updateroleid
            db.query("Update employee set role_id =? where last_name =?", [id, target], (err, data)=> {console.log(data);
            
            viewEmployees()
        
            mainMenu()
        }
            
            )
        }

        )
    })
}





mainMenu()