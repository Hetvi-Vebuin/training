
-- TASK ========= 2

-- Create the 'worker' table
-- CREATE TABLE worker (
--     WORKER_ID INT PRIMARY KEY, -- Primary Key
--     FIRST_NAME VARCHAR(50) NOT NULL,
--     LAST_NAME VARCHAR(50) NOT NULL,
--     SALARY DECIMAL(10, 2) NOT NULL,
--     JOINING_DATE DATETIME NOT NULL,
--     DEPARTMENT VARCHAR(50) NOT NULL
-- );

-- -- Create the 'title' table
-- CREATE TABLE title (
--     WORKER_REF_ID INT, -- Foreign Key referencing worker(WORKER_ID)
--     WORKER_TITLE VARCHAR(50) NOT NULL,
--     AFFECTED_FROM DATETIME NOT NULL,
-- --     PRIMARY KEY (WORKER_REF_ID, WORKER_TITLE), -- Composite Primary Key
--     FOREIGN KEY (WORKER_REF_ID) REFERENCES worker(WORKER_ID)
-- );

-- -- Create the 'bonus' table
-- CREATE TABLE bonus (
--     WORKER_REF_ID INT, -- Foreign Key referencing worker(WORKER_ID)
--     BONUS_DATE DATETIME NOT NULL,
--     BONUS_AMOUNT DECIMAL(10, 2) NOT NULL,
--     -- PRIMARY KEY (WORKER_REF_ID, BONUS_DATE), -- Composite Primary Key
--     FOREIGN KEY (WORKER_REF_ID) REFERENCES worker(WORKER_ID)
-- );
-- drop table bonus;
-- drop table title;

-- INSERT INTO worker (WORKER_ID, FIRST_NAME, LAST_NAME, SALARY, JOINING_DATE, DEPARTMENT)
-- VALUES 
-- (1, 'Monika', 'Patel', 100000, '2014-02-20 09:00:00', 'HR'),
-- (2, 'Niharika', 'Verma', 80000, '2014-06-11 09:00:00', 'Admin'),
-- (3, 'Vishal', 'Singhal', 300000, '2014-02-20 09:00:00', 'HR'),
-- (4, 'Amitabh', 'Singh', 500000, '2014-02-20 09:00:00', 'Admin'),
-- (5, 'Vivek', 'Bhatti', 500000, '2014-06-11 09:00:00', 'Admin'),
-- (6, 'Vipul', 'Diwan', 200000, '2014-06-11 09:00:00', 'Account'),
-- (7, 'Satish', 'Kumar', 75000, '2014-01-20 09:00:00', 'Account'),
-- (8, 'Geetika', 'Chauhan', 90000, '2014-04-11 09:00:00', 'Admin');

-- INSERT INTO title (WORKER_REF_ID, WORKER_TITLE, AFFECTED_FROM)
-- VALUES 
-- (1, 'Manager', '2016-02-20 00:00:00'),
-- (2, 'Executive', '2016-06-11 00:00:00'),
-- (8, 'Executive', '2016-06-11 00:00:00'),
-- (5, 'Manager', '2016-06-11 00:00:00'),
-- (4, 'Asst. Manager', '2016-06-11 00:00:00'),
-- (7, 'Executive', '2016-06-11 00:00:00'),
-- (6, 'Lead', '2016-06-11 00:00:00'),
-- (3, 'Lead', '2016-06-11 00:00:00');

-- INSERT INTO bonus (WORKER_REF_ID, BONUS_DATE, BONUS_AMOUNT)
-- VALUES 
-- (1, '2016-02-20 00:00:00', 5000),
-- (2, '2016-06-11 00:00:00', 3000),
-- (3, '2016-02-20 00:00:00', 4000),
-- (1, '2016-02-20 00:00:00', 4500),
-- (2, '2016-06-11 00:00:00', 3500);

---------------------------------------------

select * from worker;
select * from title;
select * from bonus;

-- Q-1. Write an SQL query to print the first three characters of  FIRST_NAME from Worker table.
select substr(FIRST_NAME,1,3) from worker;

-- Q-2. Write an SQL query to show only odd rows from a table.
with num as(
select *, row_number() over () rowcnt from worker
)
select * from num where mod(rowcnt,2)!=1;

-- Q-3. Write an SQL query to print details of the Workers whose FIRST_NAME ends with ‘h’ and contains six alphabets.
select * from worker where FIRST_NAME like '_____h';

-- Q-4. Write an SQL query to fetch the count of employees working in the department ‘Admin’.
select department, count(department) Count from worker where department='Admin';

-- Q-5. Write an SQL query to print details of the Workers whose SALARY lies between 100000 and 500000.
select * from worker where salary between 100000 and 500000;

-- Q-6. Write an SQL query to print details of the Workers who have joined in Feb’2014.
select * from worker where month(JOINING_DATE)=2 and year(JOINING_DATE);

-- Q-7. Write an SQL query to fetch “FIRST_NAME” from Worker table in upper case.
select upper(FIRST_NAME) first_name from worker;

-- Q-8. Write an SQL query to fetch worker names with salaries >= 50000 and <= 100000.
select first_name, salary from worker where salary>=50000 and salary<=100000;

-- Q-9. Write an SQL query to print details of the Workers who are also Managers.
select w.worker_id, w.first_name, w.department, t.worker_title from worker w join title t on w.WORKER_ID=t.WORKER_REF_ID where t.WORKER_TITLE='Manager';

-- Q-10. Write an SQL query to fetch unique values of DEPARTMENT from Worker table.
select distinct(department) from worker;

-- Q-11. Write an SQL query to fetch the first 50% records from a table.
with top50per as(
select *,row_number() over() cnt from worker)
select * from top50per where cnt<=(select count(*) from worker)/2;

-- Q-12. Write an SQL query to print the FIRST_NAME from Worker table after removing white spaces from the right side.
select trim(FIRST_NAME) FIRST_NAME from worker;

-- Q-13. Write an SQL query to print the FIRST_NAME from Worker table after replacing ‘a’ with ‘A’.
select replace(first_name, 'a', 'A') FIRST_NAME from worker;

-- Q-14. Write an SQL query to print the FIRST_NAME and LAST_NAME from Worker table into a single column COMPLETE_NAME. A space char should separate them.
select concat(first_name, " ", last_name) COMPLETE_NAME from worker;

-- Q-15. Write an SQL query to print all Worker details from the Worker table order by FIRST_NAME Ascending and DEPARTMENT Descending.
select * from worker order by first_name asc, department desc;

-- Q-16. Write an SQL query to print details of workers excluding first names, “Vipul” and “Satish” from Worker table.
select * from worker where first_name!='Vipul' and first_name!='Satish';

-- Q-17. Write an SQL query to show the current date and time.
select current_timestamp();

-- Q-18. Write an SQL query to show the second highest salary from a table.
select distinct(salary) from worker order by salary desc limit 1 OFFSET 1;
select distinct(salary) from worker order by salary desc limit 1,1;

-- Q-19. Write an SQL query to show one row twice in results from a table.
select w.*
from worker w
cross join (select 1 as dup union all select 2) t;

select * from worker
union all
select * FROM worker order by worker_id;

-- Q-20. Write an SQL query to fetch intersecting records of two tables.
select t1.*
from worker t1
inner join title t2
on t1.WORKER_ID = t2.WORKER_REF_ID;
