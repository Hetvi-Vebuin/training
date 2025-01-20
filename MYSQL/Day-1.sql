use sakila;
select * from film;

select lcase(title) from film;
select ucase(description) from film;
select length(description) from film;
select mid(description,1,20) from film;
select rental_rate, round(rental_rate,1) from film;
select now() from film;

select 
    FLOOR(12.56) AS floor_value,
    ABS(-25) AS absolute_value,
    MOD(17, 4) AS mod_value,
    CEILING(12.56) AS ceiling_value;
    
update film set release_year=2005 where title='ACE GOLDFINGER';

select title, release_year,
case
    when release_year < 2006  THEN 'The movie is less than 2006'
    else 'The movie release year is greater than 2006'
end as Rel from film;

SELECT NULLIF(10, 10.00) AS result; -- Result: NULL (because 10 = 10)
SELECT NULLIF(10, 5) AS result;  -- Result: 10 (because 10 ≠ 5)

SELECT 
    CONCAT(UPPER(SUBSTRING('Hello World', 1, 5)), ' ', LOWER(SUBSTRING('Hello World', 7))) AS result,
    REPLACE('Database Systems', 'Systems', 'Management') AS replaced_string;

select time("2017-08-15 19:30:10.000001");
select date("2017-08-15 19:30:10.000001");

select curtime() as 'date and time';

select last_update, month(last_update) from film;

select date_add(current_date(),interval -1 month) ;

create view demo_view
as
select title, rental_duration from film where rental_duration>5;
select * from demo_view;

alter view demo_view
as
select title, rental_duration from film where rental_duration>6;

-- with index -> Index  lookup on film using demo_index (release_year=2005)  (cost=0.35 rows=1) (actual time=0.0319..0.0365 rows=1 loops=1)
-- without index  -> Filter: (film.release_year = 2005)  (cost=103 rows=100) (actual time=0.0403..0.903 rows=1 loops=1)
--      -> Table scan on film  (cost=103 rows=1000) (actual time=0.0336..0.851 rows=1000 loops=1)
 
create index demo_index on film(release_year);
drop index demo_index on film;
explain analyze select * from film where release_year=2005;

delimiter &&
create PROCEDURE SelectAllCustomers(IN var1 INT)
BEGIN
	SELECT * FROM film limit var1;
END &&
SET @total = 10;
call SelectAllCustomers(@total);
drop procedure SelectAllCustomers;
SHOW PROCEDURE STATUS where db='sakila';

START TRANSACTION;
savepoint s1;
UPDATE film SET release_year = 2015 WHERE release_year = 2005;
-- UPDATE film SET release_year = 2017 WHERE release_year = 2005;
-- Check for errors (e.g., if balance becomes negative)
IF @@ERROR THEN
    ROLLBACK; -- Undo the transaction if an error occurs
ELSE
    COMMIT; -- Finalize the transaction
END IF;	

-- backup:
-- mysqldump -u root -p sakila >C:\Users\Admin\Documents\sakila_backup.sql
-- restore:
-- mysqldump -u root -p sakila <C:\Users\Admin\Documents\sakila_backup.sql

-- error handling in procedure
-- https://www.tutorialspoint.com/mysql/mysql_declare_handler_statement.htm

-- partition by
select film_id, title, description, rental_duration, count(rental_duration) over (partition by rental_duration) from film;


