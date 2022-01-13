// Dependencies 
const mysql= require('mysql2');
const inquirer =require ('inquirer');
const table = require('console.table');

// Connecting to the DB database
const connection= mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password:'12345smu!',
        database: 'company_db' 
    },
    console.log('Connected to the company_db.')
);

options();

// Start writing all the functions for the app
function options() {
  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'Add Department',
      'View All Roles',
      'Add Role',
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'Delete Department',
      'Delete Employee',
      'Delete Role',
      'Quit'
    ]

  })
    .then(function (answers) {
      console.log('view');
      switch (answers.menu) {
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'Delete Department':
          deleteDepartment();
          break;
        case 'Delete Employee':
          deleteEmployee();
          break;
        case 'Delete Role':
          deleteRole();
          break;
        case 'Quit':
          quitApp();
          break;
        default:
          console.log("error.")
        }
    })
};

// view all departments 
function viewAllDepartments() {
  const query = 'SELECT * FROM department';
  connection.query(query, function (err, res) {
    if (err) {
      console.log(err)
    }
    else {
    
      console.log(res)
      console.table(res);
      options();
    }
  })
};
// add department
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartmentName',
            message: 'Department name you would like to add?'

        }
    ]).then(function (answers) {
    // write add department syntax
        connection.query(`INSERT INTO department (name) VALUES ('${answers.newDepartmentName}');`, (err, res) => 
    {
        if (err) throw err;
        console.log('New department has been added!');
        console.log(res);
        options();
    })
  })
};

function viewAllRoles() {
  const query = 'SELECT * FROM role';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(res);
    console.table(res);
    options();
  })
};

// Add a role to the table database with the name, salary, and the department 
function addRole() {

  connection.query('SELECT * FROM department', (err, data) => {
    if (err) throw err;
    // created an array of object-department to return values
    let deptArray = data.map(function (department) {
      return {
        name: department.name,
        value: department.id
      }
    });

    inquirer.prompt([
      {
        type: 'input',
        name: 'newRoleName',
        message: 'What role would you like to add?'
      },
      {
        type: 'input',
        name: 'newRoleSalary',
        message: 'Please enter the salary for this new role.',
        validate: salaryInput => {
          if (isNaN(salaryInput)) {
            console.log('Please enter a salary.')
            return false;
          } else {
            return true;
          }
        }
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'What department is the role under?',
        choices: deptArray
      }
    ]).then(function (answers) {
      connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.newRoleName}', '${answers.newRoleSalary}', '${answers.departmentId}');`, (err, res) => {
        if (err) throw err;
        console.log('New role has been added!');
        console.log(res);
        options();
      })
    })
  });
}
// view all employee from database
function viewAllEmployees() {
  
  const query = `SELECT employee.id, employee.first_name, employee.last_name, role.salary, role.title, department.name AS department, CONCAT(manager.first_name," ", manager.last_name) AS manager
  
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager ON manager.id = employee.manager_id;
  `

  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(res);
    console.table(res);
    options();
  })
};
// add emplooyee to database
function addEmployee() {
  let roleArray = [];
  let managerArray = [];
  connection.query('SELECT id, title FROM role', (err, data) => {
    if (err) throw err;
    // created an array of object-role to return values
    roleArray = data.map(function (role) {
      return {
        name: role.title,
        value: role.id
      }
    });
    connection.query('SELECT id, first_name, last_name FROM employee', (err, data) => {
      if (err) throw err;
      // created an array of object-manager to return values
      managerArray = data.map(function (employee) {
        return {
          name: employee.first_name + " " + employee.last_name,
          value: employee.id
        }
      });
      managerArray.push({
        value: null,
        name: 'None'
      })


      inquirer.prompt([
        {
          type: 'input',
          name: 'newFirstName',
          message: 'Please enter the employee\'s first name.'
        },
        {
          type: 'input',
          name: 'newLastName',
          message: 'Please enter the employee\'s last name.'
        },
        {
          type: 'list',
          name: 'employeeRole',
          message: 'What is the employee\'s role?',
          choices: roleArray
        },
        {
          type: 'list',
          name: 'empManager',
          message: 'Who is the manager of the employee?',
          choices: managerArray
        },
      ]).then(function (answers) {
        const query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [answers.newFirstName, answers.newLastName, answers.employeeRole, answers.empManager];
        connection.query(query, params, (err, res) => {
          if (err) throw err;
          console.log('New employee has been added!');
          console.log(res);
          options();
        })
      })
    })
  })
}
// update the role of employee
function updateEmployeeRole() {
  let roleArray = [];
  let employeeArray = [];

  connection.query('SELECT id, title FROM role', (err, data) => {
    if (err) throw err;
    roleArray = data.map(function (role) {
      return {
        name: role.title,
        value: role.id
      }
    });

    connection.query('SELECT id, first_name, last_name FROM employee', (err, data) => {
      if (err) throw err;
      // creates an array of object-manager to return values
      employeeArray = data.map(function (employee) {
        return {
          name: employee.first_name + " " + employee.last_name,
          value: employee.id
        }

      });
      inquirer.prompt([
        {
          type: 'list',
          name: 'upEmployee',
          message: 'Which employee would you like to update?',
          choices: employeeArray
        },
        {
          type: 'list',
          name: 'newRole',
          message: 'Which role do you want to assign the new employee',
          choices: roleArray
        },

      ]).then(function (answers) {
        connection.query(`UPDATE employee SET role_id = '${answers.newRole}' WHERE id = '${answers.upEmployee}'`, (err, res) => {
          if (err) throw err;
          console.log('Employee updated!');
          console.log(res);
          options();
        })
      })

    })

  })
}

// Delete department
function deleteDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'Enter the name of the department you would like to remove.'
    }
  ]).then((answers) => {
    const query = `DELETE FROM department?`;
    const deleteDept = {
      name: answers.department
    };
    connection.query(query, deleteDept, (err, res) => {
      if (err) throw err;
      console.log('This department has been successfully deleted from the table of database.');
      options();
    })

  })
}

// Delete employee
function deleteEmployee() {

  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee you would like to delete.'
    }
  ]).then((answers) => {
    const query = `DELETE FROM employee?`;
    const deleteEmp = {
      id: answers.employeeId
    };
    connection.query(query, deleteEmp, (err, res) => {
      if (err) throw err;
      console.log('This employee has been deleted from the company database.');
      options();
    })
  })
}

// Delete role
function deleteRole() {

    inquirer.prompt([
      {
        type: 'input',
        name: 'role',
        message: 'Enter the role of the employee you would like to remove.'
      }
    ]).then((answers) => {
      const query = `DELETE FROM employee?`;
      const deleteEmp = {
        id: answers.role
      };
      connection.query(query, deleteRole, (err, res) => {
            if (err)
                  throw err;
            console.log('This role has been removed from the company database.');
            options();
          })
        })
    }

quitApp = () => {
  console.log('thank you!');
  connection.end();

}
