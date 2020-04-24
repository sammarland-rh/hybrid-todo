CREATE TABLE todo (
    id        SERIAL,
    title       varchar(40),
    completed         boolean
);
INSERT INTO todo(title, completed) VALUES ('Hello World', true );
INSERT INTO todo(title, completed) VALUES ('Build Todo app', true );
INSERT INTO todo(title, completed) VALUES ('Move apps around', false);
INSERT INTO todo(title, completed) VALUES ('Move to OpenShift on Google Cloud', false );
INSERT INTO todo(title, completed) VALUES ('Move to AKS', false );

