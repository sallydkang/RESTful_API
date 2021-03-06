var express = require('express');
var app = express();
var path = require('path'); //path module from node
var middleware = require('./middleware');
var bodyParser = require('body-parser');
var _ = require('lodash');
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
  var matchedTodo = _.find(todos, {id: todoId}); //using lodash
//--------without lodash----
  // var matchedTodo;
  // todos.forEach (function(todo){
  //   if(todoId === todo.id){
  //     matchedTodo = todo;
  //   }
  // })
//--------------------------
  if(matchedTodo){
    res.json(matchedTodo)
  } else {
    res.status(404).send("not found");
  }
})

app.post('/todos', function(req, res){
  var body = _.pick(req.body, ['description', 'completed']);

  if (!_.isBoolean(body.completed) || !_.isString(body.description)
  || body.description.trim().length === 0){
    return res.status(400).send(400);
  }
      body.description = body.description.trim();

      body.id = todos[todos.length-1].id+1;
      todos.push(body);
      res.json(todos);
})

app.delete('/todos/:id', function(req, res){
  var todoId = parseInt(req.params.id);
  var matchedTodo = _.find(todos, {id: todoId});
  if (!matchedTodo){
    return res.status(400).send(400)
  } else {
    todos = _.without(todos, matchedTodo);
    res.json(todos);
  }
})

app.put('/todos/:id', function(req, res){
  var todoId = parseInt(req.params.id);
  var matchedTodo = _.find(todos, {id: todoId});
  var body = _.pick(req.body, ['description', 'completed']);
  var validAttributes = {}

  if(!matchedTodo){
    return res.status(400).send(400);
  }

  if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
    validAttributes.completed = body.completed;
  } else {
    return res.status(400).send(400);
  }

  if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0){
    validAttributes.description = body.description.trim();
  } else {
    return res.status(400).send(400)
  }

  matchedTodo = _.extend(matchedTodo, validAttributes);
  res.json(todos);
})

app.get('/about', middleware.logger, function(req, res){
  res.send('<h1> Express About Page</h1>')
})

app.listen(PORT, function(){
  console.log(`Listening on PORT ${PORT}`);
})
