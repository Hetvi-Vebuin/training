use sakila;
select * from film;

-- trigger
select * from log_tab;
create table log_tab (id int auto_increment, updated_date date, primary key(id));

delimiter $$
drop trigger demo_trigger;
CREATE TRIGGER demo_trigger
AFTER UPDATE ON film
FOR EACH ROW
BEGIN
	insert into log_tab(updated_date) values(now());
END$$

update film set length=90 where rental_duration=6;
show triggers;


 -- CTE
WITH filtered_departments AS (
    SELECT title, description
    FROM film
    WHERE length = 80
)
select * from film where title in (select title from filtered_departments) group by (release_year);
select count(release_year) from film where title in (select title from filtered_departments) group by (release_year);

SELECT * FROM film
WHERE MATCH(title, description) AGAINST('database' IN NATURAL LANGUAGE MODE);
