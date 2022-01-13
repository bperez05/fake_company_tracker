DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  departments_name VARCHAR(30) NOT NULL 
);
CREATE TABLE roles(
  roles_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  departments_id INT,
  FOREIGN KEY (departments_id)
  REFERENCES departments(departments_id)
  ON DELETE SET NULL
);

CREATE TABLE employees(
  employees_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT,
  FOREIGN KEY (roles_id)
  REFERENCES roles(roles_id)
  ON DELETE SET NULL,
  manager_id INT DEFAULT NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employees(employees_id)
  ON DELETE SET NULL
);