const connection = require("../db/connection");

class Department {
  constructor(connection) {
    this.db = connection;
  }

  // Find all departments
  findAllDepartments() {
    return this.db
      .promise()
      .query("SELECT department.id, department.name FROM department;");
  }
  // Create a new department
  createDepartment(department) {
    return this.db.promise().query("INSERT INTO department SET ?", department);
  }

  // Remove a department
  removeDepartment(departmentId) {
    return this.db
      .promise()
      .query("DELETE FROM department WHERE id = ?", departmentId);
  }
  // Find all departments, join with employees and roles and sum up utilized department budget
  viewDepartmentBudgets() {
    return this.db
      .promise()
      .query(
        "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
      );
  }
}

module.exports = new Department(connection);
