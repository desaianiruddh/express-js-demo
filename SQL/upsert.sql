-- update using insert with on conflict (update + insert = upsert)
insert into
  demo_user (
    id,
    first_name,
    last_name,
    gender,
    email,
    date_of_birth
  )
values
  (
    1,
    'aniruddh',
    'desai',
    'Male',
    'desai.ani.ap@mail.com',
    Date '2001-03-27'
  ) on conflict (id) do
update
set
  email = excluded.email,
  first_name = excluded.first_name;