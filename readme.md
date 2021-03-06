#Express- Todo App

**FIRST STEPS**

- create directory for app
- ```$ npm init```
- ```$ npm express install --save```
- ```$touch server.js``` (make sure package.json matches server.js)
- require express and create express on ```server.js```
- check to see if the server is running correctly by writing this function in ```server.js```: 

```javascript
app.listen(3000, function(){
  console.log('Listening on PORT 3000');
})
```

##**MIDDLEWARE**
Set up middleware: 

- create an object of functions that executes a request and response cycle

First middleware function **requireAuthentication** will run globally
(always add next() to help the middleware transition to the next function)

Second middleware function **logger** is being executed only when the get response for `'/about'` runs

You can add middleware on the routes like this: 

```javascript
app.get('/about', middleware.logger, function(req, res){
  res.send('<h1> Express About Page</h1>')
})
```

When you separate code into another js file like `middleware.js`,
**dont forget** to add on `server.js`:

```javascript
var middleware = require('./middleware');
```

and on the ```middleware.js``` file 

```javascript
module.exports = middleware;
```

###MORE MIDDLEWARE
-
Install **body-parser** by running `$ npm install body-parser --save`

For body-parser to **run**, add `var bodyParser = require('body-parser')` to `server.js` --> this requires the module body-parser

Run the middleware body-parser globally on `server.js`

```javascript
app.use(bodyParser());
```

---

#Starting Todos
**CREATE THE ROUTE**

- On `server.js` add a route `'/todos'` 
- create a variable of objects that stores todo data
- render json on the /todo page

###**`server.js`:**
-

```javascript
app.get('/todos', function(req, res){
  res.json(todos);
})
```

---> ```res.json(todos)``` todos should be the **variable of objects**

Use **postman** to check if everything is running correctly

###**SINGLE TODO ROUTE**
-

Set up routes that shows single object in the todos array:

- write a route that requests `'/todos/:id'` with a get response

Set a variable that **stores** the `:id` params:

`var todoId = parseInt(req.params.id); ` (**parseInt** helps converts to an integer)

---> this gives us a way to access the params and **compare** it to the actual todos id (id **key** set in the array).

Write a `forEach` **loop** that matches the params id (`todoId`) with the id of the todos array

- when its matched `res.json` the matched todo
- when it is not matched `res.status(404)` an error message 

###**POSTING TODO**
-

Set up the route for posting 

- write a route that **posts** to `'/todos'` 

- Use `req.body` in a variable to access **all** the information of the post

- Set the `req.body` **variable** (`body`) key: `id` to the next id of the array

```javascript
body.id = todos[todos.length-1].id+1;
```

_This grabs the last object of the array by calculating the arrays' **length** and accessing the **key** id_

- **Push** the `body` to the array: ```todos.push(body);```

###**USING LODASH**
-

`npm install lodash --save` 

Refactor the routes for get and post requests

Instead of writing loops and if statements, you can use lodash to refactor those into shorter code

**Examples:**

```javascript
var matchedTodo = _.find(todos, {id: todoId});
```
_this helps find the todos array key id and match it with the variable `todoId`_

```javascript
var body = _.pick(req.body, ['description', 'completed']);
```
_this helps `req.body` only grab the key values of description and complete_

```javascript
todos = _.without(todos, matchedTodo);
```
_this helps **delete** the `matchedTodo` value in the `todos` array_

###**DELETE TODO** 
-
Set the route:

- set a delete request to `/todos/:id` to grab one todo
- get the `req.params.id` and match it with the objects key id
- when it is not matched show an error
- if matched take that object out of the array

###**UPDATE TODO**
-

Set the route:

- set a put request to `'/todos/:id` to grab one todo
- get the key id and match it to the params id
- user lodash `_.pick` to grab the body of the request with the key of _'description'_ and _'completed'_
- create a variable that will store an object
- if the `req.body` has the right key values add it into the empty object variable
- then use `_.extend` to swap the values of the object into the array with the same key id

**Always** start with `!` not if statement 