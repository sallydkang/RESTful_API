var express = require('express');
var app = express();
var path = require('path'); //path module from node
var middleware = require('./middleware')
var bodyParser = require('body-parser')
var PORT = process.env.PORT || 3000;

//start todo
var todos = [
  {
    id: 1,
    description: 'Teach REST API',
    completed: false
  },
  {
  id: 2,
  description: 'Go eat a healthy lunch',
  completed: true
  }
]

//calling middleware globally
app.use(middleware.requireAuthentication);
app.use(bodyParser());

app.get('/', function(req, res){
  res.send('<h1>Express TODO API</h1>')
})

app.get('/todos', function(req, res){
  res.json(todos);
})

app.get('/todos/:id', function(req, res){
  var todoId = parseInt(req.params.id);
  var matchedTodo;
  todos.forEach (function(todo){
    if(todoId === todo.id){
      matchedTodo = todo;
    }
  })
  if(matchedTodo){
    res.json(matchedTodo)
  } else {
    res.status(404).send("not found");
  }
})

app.post('/todos', function(req, res){
  var body = req.body;
  body.id = todos[todos.length-1].id+1;
  todos.push(body);
  res.json(todos);
})

app.get('/about', middleware.logger, function(req, res){
  res.send('<h1> Express About Page</h1>')
})

app.listen(PORT, function(){
  console.log(`Listening on PORT ${PORT}`);
})
