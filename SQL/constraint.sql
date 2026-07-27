SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'demo_user';

alter table demo_user drop constraint demo_user_email_key;

alter table demo_user add constraint unique (email);
alter table demo_user add constraint demo_user_email_address_key unique (email);

update demo_user set email = 'rcommings0@imgur.com' where id = 20;

-- constraint for specific data
select distinct gender from demo_user du ;
alter table demo_user add constraint gender_constraint check (gender = 'Male' or gender = 'Female');
update demo_user set gender = 'a' where id = 20;

-- add foreign key and constraint
alter table demo_user add column car_id bigint;
alter table demo_user add constraint car_id_fk_unique unique(car_id);
alter table demo_user add constraint fk_demo_user_car foreign key (car_id) references car (id);
update demo_user du set car_id = 500 where id = 1;