const connection = require("../db/connection");

class EmployeeQuery {
  constructor(connection) {
    this.db = connection;
  }

  findAllEmployees() {
    return this.db
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
      );
  }

  // Create a new employee
  createEmployee(employee) {
    return this.db
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }

  // Remove an employee with the given id
  removeEmployee(employeeId) {
    return this.db
      .promise()
      .query("DELETE FROM employee WHERE id = ?", employeeId);
  }

  // Update the given employee's manager
  updateEmployeeManager(employeeId, managerId) {
    return this.db
      .promise()
      .query("UPDATE employee SET manager_id = ? WHERE id = ?", [
        managerId,
        employeeId,
      ]);
  }

  findAllEmployeesByDepartment(departmentId) {
    return this.db
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
        departmentId
      );
  }

  findAllEmployeesByManager(managerId) {
    return this.db
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
        managerId
      );
  }
}

module.exports = new EmployeeQuery(connection);
