--create table car (
--	id SERIAL PRIMARY KEY,
--	make varchar(100) not  null,
--	model varchar(100) not null,
--	price Numeric(19, 2) not null
--)
select
  *
from
  car
order by
  price :: integer asc;

select
  id,
  make,
  model,
  price as original_price,
  ROUND(price * 0.1, 2) as discount,
  ROUND(price - price * 0.1, 2) as finale_price
from
  car;

select
  coalesce(make, 'Make Not Provided')
from
  car;

select
  10 / 0;

select
  coalesce(10 / nullif(0, 0), 0);

select
  now() - interval '3 days 4 months 1 year';

select
  extract (
    year
    from
      now()
  );

select
  extract (
    dow
    from
      now()
  );