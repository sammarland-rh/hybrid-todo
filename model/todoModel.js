const initOptions = {};

var pgp = require('pg-promise')(initOptions);

if (!process.env.ENVIRONMENT) {
  console.log("Loading Config from local");
  require('dotenv').config({
    path: 'config/local.env'
  });
} else if (process.env.ENVIRONMENT == "OpenShift") {
  console.log("Loading Config from OpenShift");
  require('dotenv').config({
    path: 'config/openshift.env'
  });
} else if (process.env.ENVIRONMENT == "Azure") {
  console.log("Loading Config from Azure");
  require('dotenv').config({
    path: 'config/azure.env'
  });
} else {
  console.log("Loading Config from local");
  require('dotenv').config({
    path: 'config/local.env'
  });
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
          console.log(data.id); // print new user id;
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