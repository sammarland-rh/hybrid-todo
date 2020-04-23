CREATE TABLE todo (
    id        SERIAL,
    title       varchar(40),
    completed         boolean
);
INSERT INTO todo(title, completed) VALUES ('Hello World', true );
INSERT INTO todo(title, completed) VALUES ('Introduction to Quarkus', true);
INSERT INTO todo(title, completed) VALUES ('Hibernate with Panache', false );
INSERT INTO todo(title, completed) VALUES ('Visit Quarkus web site', false );
INSERT INTO todo(title, completed) VALUES ('Star Quarkus project', false );
INSERT INTO todo(title, completed) VALUES ('Star Quarkus project 2', false);
INSERT INTO todo(title, completed) VALUES ('Star Quarkus project 3', false);
INSERT INTO todo(title, completed) VALUES ('Star Quarkus project 4', false);
INSERT INTO todo(title, completed) VALUES ('Star Quarkus project 5', false);

