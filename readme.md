#Express- Todo App

**FIRST STEPS**

- create directory for app
- npm init
- npm express install --save
- touch server.js (make sure package.json matches server.js)
- require express and create express on server.js
- check to see if the server is running correctly: 
```javascript
app.listen(3000, function(){
  console.log('Listening on PORT 3000');
})
```

**MIDDLEWARE**
-----
Set up middleware: create an object of functions that executes a request and response cycle

First function **requireAuthentication** will run globally
(always add next() to help the middleware transition to the next function)

second function **logger** is being executed only when the get response for '/about' runs

You can add middleware on the routes like this: 

```javascript
app.get('/about', middleware.logger, function(req, res){
  res.send('<h1> Express About Page</h1>')
})
```
