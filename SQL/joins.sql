create table car (
  id SERIAL PRIMARY KEY,
  make varchar(100) not null,
  model varchar(100) not null,
  price Numeric(19, 2) not null
);

create table person (
  id BIGSERIAL primary key,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  gender varchar(6),
  email varchar(100) unique not null,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  car_id bigint references car(id),
  unique car_id
);

-- inner join
select
  du.first_name,
  du.last_name,
  car.make,
  car.model,
  car.price
from
  demo_user du
  join car on du.car_id = car.id;

-- left join
select
  du.first_name,
  du.last_name,
  car.make,
  car.model,
  car.price
from
  demo_user du
  left join car on car.id = du.car_id;

-- sub query
select
  first_name,
  price
from
  (
    select
      du.first_name,
      du.last_name,
      car.make,
      car.model,
      car.price
    from
      demo_user du
      left join car on car.id = du.car_id
  )
where
  price > 400000