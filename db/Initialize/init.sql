drop table if exists issues;
drop table if exists users;
drop table if exists contributers;

create table users(
    user_id serial primary key,
    email varchar(64) not null unique,
    password varchar(500) not null
);

create table issues(
    issue_id serial primary key,
    user_id integer references users(user_id),
    thumbnail text,
    images text [],
    name varchar(64),
    description text,
    urgency integer default 0,
    comments text [],
    lat float,
    long float
);

create table contributors(
    contributor_id integer references users(user_id),
    contributed_to_issue integer references issues(issue_id)
);