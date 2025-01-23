select * from employees;
select * from departments;

-- TASK ======== 1

-- 1. Find the names, street address, and cities of residence for all employees who work for'First Bank Corporation' and earn more than $10,000.
select emp_name, street_address, city from employees where company_name='First Bank Corporation' and salary>10000;

-- 2. Select the employees in department 30
select * from employees where dept_no=30;

-- 3. List the names, numbers and departments of all clerks.
select e.emp_name, e.job_title, d.dept_name from employees e left join departments d on  e.dept_no=d.dept_no where job_title='Clerk';

-- 4. Find the department numbers and names of employees of all departments with deptno greater than 20.
select emp_name, dept_no from employees where dept_no>20;

-- 5. Find employees whose commission is greater than their salaries.
update employees set commission=100000 where emp_id=2;
select * from employees where commission > salary;

-- 6.  Find employees whose commission is greater than 60 % of their salaries.
select * from employees where commission>(salary*0.6)+salary;

-- 7. List name, job and salary of all employees in department 20 who earn more than 2000/-.
select emp_name, job_title, salary from employees where dept_no=20 and salary>2000;

-- 8. Find all salesmen in department 30 whose salary is greater than 1500/-.
select e.emp_name, d.dept_name, e.job_title, e.salary from employees e left join departments d on d.dept_no=e.dept_no where e.dept_no=30 and e.job_title='Salesman' and e.salary>1500;

-- 9. Find all employees whose designation is either manager or president.
select emp_name, designation from employees where designation='Manager' or designation='President';

-- 10. Find all managers who are not in department 30.
select emp_name, designation, dept_no from employees where designation='Manager' and dept_no!=30;

-- 11. Find all the details of managers and clerks in dept 10.
select * from employees where (designation='Manager' or designation='Clerk') and dept_no!=30;

-- 12. Find the details of all the managers (in any dept) and clerks in dept 20.
select * from employees where designation='Manager' or (designation='Clerk' and dept_no=20);

-- 13. Find the details of all the managers in dept. 10 and all clerks in dept 20 and all employees who are neither managers nor clerks but whose salary is more than or equal to 2000/-.
select * from employees where (designation='Manager' and dept_no=10) or (designation='Clerk' and dept_no=20) or (designation!='Manager' and designation!='Clerk' and salary>=2000);

-- 14. Find the names of anyone in dept. 20 who is neither manager nor clerk.
select emp_name, designation, dept_no from employees where dept_no=20 and designation!='Manager' and designation!='Clerk';

-- 15. Find the names of employees who earn between 1200/- and 1400/-.
select emp_name, salary from employees where salary between 1200 and 1400;

-- 16. Find the employees who are clerks, analysts or salesmen.
select * from employees where designation in('Clerk','Analyst','Salesman');

-- 17. Find the employees who are not clerks, analysts or salesmen.
select * from employees where designation not in('Clerk','Analyst','Salesman');

-- 18. Find the employees who do not receive commission.
select * from employees where commission is NULL or commission=0;

-- 19. Find the different jobs of employees receiving commission.
select distinct(job_title) from employees where commission is not NULL and commission>0;

-- 20. Find the employees who do not receive commission or whose commission is less than 100/-.
select distinct(job_title) from employees where commission is NULL or commission<100;

-- 21. If all the employees not receiving commission is entitles to a bonus of Rs. 250/- show the net earnings of all the employees.
select emp_name, job_title, salary, commission, 
salary+coalesce(commission,0) +
case
	when commission is null then 250
    else 0
end netearning from employees;

-- 22. Find all the employees whose total earning is greater than 2000/- .
select emp_name, job_title, salary, commission, salary+commission total_earning from employees where salary+commission>2000;

-- 23. Find all the employees whose name begins or ends with ‘M’
select emp_id, emp_name from employees where emp_name like 'M%' or emp_name like '%m';

-- 24. Find all the employees whose names contain the letter ‘M’ in any case.
select emp_id, emp_name from employees where emp_name like '%M%';

-- 25. Find all the employees whose names are up to 15 character long and have letter ‘R’ as 3rd character of their names.
select emp_id, emp_name from employees where length(emp_name)<=15 and emp_name like '__r%';

-- 26. Find all the employees who were hired in the month of February (of any year).
select emp_id, emp_name, hire_date from employees where month(hire_date)=2;

-- 27. Find all the employees who were hired on last day of the month.
select emp_id, emp_name, hire_date from employees where day(hire_date)=day(last_day(hire_date));

-- 28. Find all the employees who were hired more than 2 years ago.
select emp_id, emp_name, hire_date from employees where	year(current_date())-year(hire_date)>2;

-- 29. Find the managers hired in the year 2003.
update employees set hire_date='2003-01-20' where emp_id=1;
select emp_id, emp_name, job_title from employees where job_title='Manager' and year(hire_date)=2003;

-- 30. Display the names and jobs of all the employees separated by a space.
select concat(emp_name," , ",job_title) name_jobTitle from employees;

-- 31. Display the names of all the employees right aligning them to 15 characters.
select concat(space(15-length(emp_name)), emp_name) right_aligning from employees;
select lpad(emp_name, 15," ") from employees;

-- 32. Display the names of all the employees padding them to the right up to 15 characters with ‘*’.
select rpad(emp_name, 15,"*") emp_name from employees;

-- 33. Display the names of all the employees without any leading ‘A’.
update employees set emp_name='Aamy Green' where emp_name='Amy Green';
select emp_name, REGEXP_REPLACE(emp_name, '^A+', '') as emp_name from employees;

-- 34. Display the names of all the employees without any trailing ‘R’.
update employees set emp_name='Emma Carterr' where emp_name='Emma Carter';
select emp_name, REGEXP_REPLACE(emp_name, 'r+$', '') as emp_name from employees;

-- 35. Show the first 3 and last 3 characters of the names of all the employees.
select concat(left(emp_name, 3),right(emp_name, 3)) emp_name from employees;

-- 36. Display the names of all the employees replacing ‘A’ with ‘a’.
select replace(emp_name,'A','a') emp_name from employees;

-- 37. Display the names of all the employees and position where the string ‘AR’ occurs in the name.
update employees set emp_name='Emma Cartarerr' where emp_name='Emma Carterr';
select emp_name, instr(emp_name, 'ar') position from employees  ;

-- 38. Show the salary of all the employees , rounding it to the nearest Rs. 1000/-.
select emp_name, salary, round(salary/1000.00)*1000 rounding from employees;

-- 39. Display the names, jobs and salaries of employees, sorting on job and salary.
select emp_name, job_title, salary from employees order by job_title, salary;

-- 40. Display the names, jobs and salaries of employees, sorting on descending order of job and within job sorted on salary.
select emp_name, job_title, salary from employees order by job_title desc, salary;

-- 41. List the employee names, department names and salary for those employees who have completed 1 year of service.
update employees set hire_date='2024-1-22' where emp_id=3;
select emp_name, job_title, salary, hire_date from employees where timestampdiff(year, hire_date, current_date())=1;

-- 42. List the employee names, department names and hiredate for those employees who have joined in 2003 . Sort your output in the order of joining date.
update employees set hire_date='2003-1-22' where emp_id=3;
select emp_name, job_title, hire_date from employees where year(hire_date)=2003 order by hire_date;

select * from employees;

