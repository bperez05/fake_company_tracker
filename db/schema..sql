DROP DATABASE IF EXISTS fakecompany_db;
CREATE DATABASE fakecompany_db;

USE fakecompany_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  departments_name VARCHAR(30) NOT NULL 
);