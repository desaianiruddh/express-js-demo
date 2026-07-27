--create table demo_user (
-- id SERIAL primary key, 
-- first_name varchar(50) not null,
-- last_name varchar(50) not null,
-- gender varchar(6),
-- email varchar(100) unique not null,
-- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--)

--alter table demo_user add column date_of_birth Date

--ALTER TABLE demo_user ALTER COLUMN date_of_birth SET NOT NULL;

insert into demo_user (first_name, last_name , gender, email, date_of_birth ) 
				values ('aniruddh', 'desai', 'Male', 'desai.ani.ap@gmail.com', Date '2001-03-27') on conflict (email) do nothing;

-- SORTING
select * from demo_user du order by cast(id as integer) asc;
select * from demo_user du order by id::integer asc limit 10;

-- PAGINATION
select * from demo_user du  limit 10 offset (:pageNumber - 1)*10;
select * from demo_user du fetch first 10 row only offset (:pageNumber - 1)*10;

-- FIND AND SEARCH
select * from demo_user where first_name = 'aniruddh';
select * from demo_user where first_name in ('aniruddh', 'Shanan', 'Averyl');
select * from demo_user where date_of_birth between date '2001-01-01' and '2020-12-31';
select * from demo_user where id between 1 and 25;
select * from demo_user where first_name like '%An%';
select * from demo_user where first_name ilike '%An%';
select * from demo_user du where email like '_______@%'

-- GROUP BY, COUNT and HAVING
select gender, count(*) from demo_user du group by gender;
select gender, count(*) from demo_user du group by gender having count(*) > 20;
select gender, count(*) from demo_user du group by gender having count(*) > 2 order by count(*) asc;

select *, age(now(), now() - interval '5 year 1 month 2 days') from demo_user du;

-- Delete record
delete from demo_user where id = 2;

-- Update record
update demo_user set email = 'rcommings0@imgur.com' where id = 20;


select 1 < 1;