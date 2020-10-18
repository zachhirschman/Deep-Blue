drop table if exists contributors cascade;
drop table if exists users cascade;
drop table if exists issues cascade;
drop table if exists private_messages cascade;


create table users(
    user_id serial primary key,
    email varchar(64) not null unique,
    password varchar(500) not null,
    profile_picture text,
    bio text
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
    long float,
    resolved boolean default false
);

create table contributors(
    contributor_id integer references users(user_id),
    contributed_to_issue integer references issues(issue_id)
);

create table private_messages(
    message_id serial primary key,
    sender_id integer references users(user_id),
    recipient_id integer references users(user_id),
    room_id integer,
    time_sent TIMESTAMPTZ DEFAULT Now(),
    message text,
    liked boolean default false,
    image text
);