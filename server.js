var express = require('express');
var app = express();
var path = require('path'); //path module from node
var middleware = require('./middleware')
var PORT = process.env.PORT || 3000;

app.use(middleware.requireAuthentication);

app.get('/', function(req, res){
  res.send('<h1>Express TODO API</h1>')
})

app.get('/about', middleware.logger, function(req, res){
  res.send('<h1> Express About Page</h1>')
})

app.listen(PORT, function(){
  console.log(`Listening on PORT ${PORT}`);
})
