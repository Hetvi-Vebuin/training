create database task_1;
use task_1;

-- Create Department Table
CREATE TABLE Department (
    DeptNo INT PRIMARY KEY,
    DeptName VARCHAR(50),
    Location VARCHAR(50)
);

-- Create Employee Table
CREATE TABLE Employee (
    EmpNo INT PRIMARY KEY,
    Name VARCHAR(50),
    Job VARCHAR(50),
    Manager INT,
    HireDate DATE,
    Salary DECIMAL(10, 2),
    Commission DECIMAL(10, 2),
    DeptNo INT,
    FOREIGN KEY (DeptNo) REFERENCES Department(DeptNo)
);

-- Data of Department table
INSERT INTO Department (DeptNo, DeptName, Location) VALUES
(10, 'Accounting', 'New York'),
(20, 'Research', 'Dallas'),
(30, 'Sales', 'Chicago'),
(40, 'Operations', 'Boston'),
(50, 'Marketing', 'San Francisco'),
(60, 'IT', 'Seattle'),
(70, 'HR', 'Atlanta'),
(80, 'Logistics', 'Los Angeles');

-- Data of Employee table
INSERT INTO Employee (EmpNo, Name, Job, Manager, HireDate, Salary, Commission, DeptNo) VALUES

-- Department 10 (Accounting)
(11, 'Matthew', 'Clerk', 1, '2010-03-14', 1500, NULL, 10),
(12, 'Andrew', 'Analyst', 4, '2009-06-01', 3200, NULL, 10),
(13, 'Sophia', 'Clerk', 12, '2012-11-10', 1300, NULL, 10),

-- Department 20 (Research)
(14, 'Lucas', 'Manager', 6, '2010-04-21', 5000, NULL, 20),
(15, 'Olivia', 'Clerk', 14, '2015-08-15', 1150, NULL, 20),
(16, 'Ethan', 'Analyst', 14, '2013-07-23', 2800, NULL, 20),

-- Department 30 (Sales)
(17, 'Sophia', 'Salesman', 8, '2011-02-11', 2500, 700, 30),
(18, 'Mason', 'Salesman', 8, '2014-09-08', 2100, 650, 30),
(19, 'Emma', 'Clerk', 8, '2016-05-18', 1450, NULL, 30),

-- Department 40 (Operations)
(20, 'Noah', 'Manager', 4, '2007-12-12', 6000, NULL, 40),
(21, 'Liam', 'Clerk', 20, '2018-10-03', 1350, NULL, 40),

-- Department (Marketing)
(22, 'Amelia', 'Manager', 20, '2008-03-01', 4700, NULL, 50),
(23, 'Charlotte', 'Clerk', 22, '2019-11-15', 1200, NULL, 50),
(24, 'Elijah', 'Salesman', 22, '2017-07-21', 1900, 450, 50),

-- Department 60 (IT)
(25, 'James', 'Analyst', NULL, '2006-01-25', 3400, NULL, 60),
(26, 'Isabella', 'Clerk', 25, '2018-12-05', 1100, NULL, 60),

-- Department 70 (HR)
(27, 'Benjamin', 'Manager', 4, '2012-06-15', 5500, NULL, 70),
(28, 'Mia', 'Clerk', 27, '2020-03-20', 1300, NULL, 70),

-- Department 80 (Logistics)
(29, 'Ella', 'Manager', 20, '2010-01-01', 5000, NULL, 80),
(30, 'Ava', 'Salesman', 29, '2013-10-19', 1800, 500, 80);

INSERT INTO Employee (EmpNo, Name, Job, Manager, HireDate, Salary, Commission, DeptNo) VALUES
(1, 'John', 'Manager', NULL, '2001-06-15', 5000, 1000, 10),
(2, 'Alice', 'Clerk', 1, '2003-02-20', 1200, NULL, 10),
(3, 'Bob', 'Salesman', 1, '2005-09-30', 1800, 500, 30),
(4, 'David', 'President', NULL, '2000-01-01', 8000, NULL, 10),
(5, 'Eve', 'Clerk', 1, '2004-05-10', 1400, NULL, 20),
(6, 'Charlie', 'Analyst', 1, '2002-12-15', 3000, NULL, 20),
(7, 'Grace', 'Salesman', 3, '2006-03-05', 1600, 600, 30),
(8, 'Henry', 'Manager', 4, '2003-08-19', 4500, NULL, 30),
(9, 'Ivy', 'Clerk', 6, '2007-11-21', 1100, NULL, 20),
(10, 'Mark', 'Salesman', 8, '2005-07-01', 2200, 800, 30);

-- Drop Department Table and Employee Table
-- drop table Employee;
-- drop table Department;

select * from employee;
select * from department;