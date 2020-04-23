var express = require('express');
var router = express.Router();
var todoModel = require("../model/todoModel").todoModel;

router.get('/', function (req, res) {
  res.status(200).send();
});

router.get('/todos', function (req, res) {
  todoModel.getAll().then(function (data) {
    res.json(data);
  });
});

router.post('/todos', function (req, res) {
  todo = req.body;
  todoModel.create(req.body).then(function(id){
    todo.id = id;
    res.json(todo);  
  });
});

router.put('/todos/:id', function (req, res) {
  var id = parseInt(req.params['id'], 10);
  var todo = req.body;
  todoModel.update(id, todo).then(function(data){
    res.json(data);
  })
})

router.delete('/todos/:id', function (req, res) {
  var id = parseInt(req.params['id'], 10);
  todoModel.delete(id).then(function(){
    res.status(200).send();
  });
});

module.exports = router;