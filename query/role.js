const connection = require("../db/connection");

class Role {
  constructor(connection) {
    this.db = connection;
  }

  // Find all employees except the given employee id
  findAllPossibleManagers(employeeId) {
    return this.db
      .promise()
      .query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId
      );
  }

  // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.db
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        roleId,
        employeeId,
      ]);
  }
  // Find all roles, join with departments to display the department name
  findAllRoles() {
    return this.db
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
      );
  }

  // Create a new role
  createRole(role) {
    return this.db.promise().query("INSERT INTO role SET ?", role);
  }

  // Remove a role from the db
  removeRole(roleId) {
    return this.db.promise().query("DELETE FROM role WHERE id = ?", roleId);
  }
}

module.exports = new Role(connection);
