const initOptions = {};

var pgp = require('pg-promise')(initOptions);
const fs = require('fs');
const path = require('path');
const envPath = "../config/run.env";

if (fs.existsSync(path.resolve(__dirname, envPath))) {
  console.log("Getting config from "+path.resolve(__dirname, envPath));
  require('dotenv').config({
    path: envPath
  });
} else {
  console.error("No config supplied. App is unlikely to work. Please define config/run.env");
}

// Database connection details;
const cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

var db = pgp(cn);

module.exports.todoModel = (function () {
  return {
    create: async function (todo) {
      return db.one('INSERT INTO todo(title, completed) VALUES(${title}, ${completed}) RETURNING id', {
          title: todo.title,
          completed: todo.completed
        })
        .then(data => {
          return (data.id);
        })
        .catch(error => {
          console.log('ERROR:', error); // print error;
          return (error);
        });
    },

    getAll: async function () {
      return db.manyOrNone('SELECT * FROM todo')
        .then(function (data) {
          return (data);
        })
        .catch(function (error) {
          console.log('ERROR:', error)
          return (error);
        });
    },
    delete: async function (id) {
      return db.none('DELETE FROM todo WHERE id=${id}', {
        id: id
      });

    },
    update: function (id, todo) {
      return db.one('UPDATE todo SET title=${title}, completed=${completed} WHERE id=${id} RETURNING id,title,completed', {
          id: id,
          title: todo.title,
          completed: todo.completed
        }).then(function (data) {
          return (data);
        })
        .catch(function (error) {
          console.log('ERROR:', error)
          return (error);
        });
    }

  };

})();