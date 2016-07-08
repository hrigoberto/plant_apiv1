// a list of all the modules we are using within this file, and server is using express itself to create a server.
var express = require('express');
var server = (express());
var bodyParser = require('body-parser');
var lowdb = require('lowdb');
var uuid = require('uuid');

// Plant is calling up our very own module called Plant.js which is in models
var Plant = require('./models/Plant.js')
// port allows our server to deploy through the web (heroku) OR || localhost 8080
var port = process.env.PORT || 8080
// tells this file that we are using the lowdb module to access the db.json file
var db = lowdb('db.json');

db.defaults({plants: []})
  .value();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/plants', function(request, response){
  var plants = db.get('plants')
                .value();
  response.send(plants);
})

server.get('/plants/:id', function(request, response){
  var plant = db.get('plants')
                .find({id: request.params.id})
                .value()
  response.send(plant);
});

server.post('/plants', function(request, response){
  var plant = new Plant(request.body.commonName,
                        request.body.scientificName,
                        request.body.layerType,
                        request.body.use);
  var result = db.get('plants')
                 .push(plant)
                 .last()
                 .value();
  response.send(result);
});

server.put('/plants/:id', function(request, response){
  var plant = new Plant(request.body.commonName,
                        request.body.scientificName,
                        request.body.layerType,
                        request.body.use,
                        request.params.id);
  plant.updateUse(request.body.use);
  plant.updateLayerType(request.body.layerType);
  var updatedPlant = db.get('plants')
                       .find({id: request.params.id})
                       .assign(plant)
                       .value();
  response.send(updatedPlant);
})

server.delete('/plants/:id', function(request, response){
  var plant = db.get('plants')
                .remove({id: request.params.id})
                .value();
  response.send(plant);
})

server.listen(port, function(){
  console.log('Now listening to port:', port);
});
