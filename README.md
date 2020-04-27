# TODO App to demonstrate portability across different platforms.

## Introduction

We chose a ToDo application to demonstrate portability for a few reasons.

* It is easy to understand
* More realistic as it has some persistence
* Quick to build

This applications is designed to be a traditional '3 tier' application. The presentation layer is implenemented by the fantastic [TodoMVC](http://todomvc.com/) project. I then wrote a simple NodeJS server layer that accepts requests from the frontend and interfaces with a PostgreSQL DB. In each of the different environments the DB is provided in differnet ways.

## Working with the project

The app has all of its configuration externalised to make moving it from platform to platfrom easy. This is one of the [12 Factor Apps(https://12factor.net/)] principles.

If you don't already have one, create a `config` directory with a file in it called `run.env`. You will need to supply the following configuration options for the app to function:

```
DB_HOST=localhost //Hostname of the Database
DB_PORT=5432 //Port of the Database (Normally 5432)
DB=todo // Name of the DB
DB_USER=sam // DB Username
DB_PASSWORD= // DB user's password
PORT=8081 // Port for the app to run on. If blank it will be 3000
```

There's an `import.sql` script included in this project to provide some sample data. It contains the table structure and some basic starting items.

To create the table. Log in to your database using a tool that can execute sql commands. Make sure you're in the right DB and run the create table command.