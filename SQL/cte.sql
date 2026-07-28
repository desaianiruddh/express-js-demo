-- comman table expression
WITH premium_cars AS (
  SELECT
    id,
    model,
    price
  FROM
    car
  WHERE
    price > 400000
)
SELECT
  du.first_name,
  pc.model,
  pc.price
FROM
  demo_user du
  INNER JOIN premium_cars pc ON pc.id = du.car_id;

-- recursive cte
with recursive inc_num as (
  select
    1 as n
  union
  all
  select
    n + 1
  from
    inc_num
  where
    n < 5
)
select
  *
from
  inc_num;

with recursive inc_user as (
  select
    first_name,
    id
  from
    demo_user du
  where
    id = 1
  union
  all
  select
    du.first_name,
    iu.id + 1
  from
    demo_user du
    join inc_user iu on iu.id = du.id
  where
    iu.id < 20
)
select
  *
from
  inc_user;