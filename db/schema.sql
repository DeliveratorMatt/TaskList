DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id serial primary key,
    username text not null,
    password text not null
);

CREATE TABLE tasks (
    id serial primary key,
    title text not null,
    done boolean not null,
    user_id integer not null REFERENCES users(id) ON DELETE CASCADE
)
