drop table if exists users;
create table users(
    user_id serial primary key,
    email varchar(64) not null unique,
    password varchar(500) not null
);