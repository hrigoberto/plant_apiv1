var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var lowdb = require('lowdb');
var uuid = require('uuid');

var port = process.env.PORT || 8080
var db = lowdb('db.json');

db.defaults({plants: []})
  .value();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extened: true}));

server.post('/plants', function(request, response){
  var plant = {
    id: uuid.v4(),
    commonName: request.body.commonName,
    scientificName: request.body.scientificName,
    typeOfPlant: request.body.typeOfPLant, 
  }
});

server.listen(port, function(){
  console.log('Now listening to port:', port);
});
