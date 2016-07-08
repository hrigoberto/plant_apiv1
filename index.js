var express = require('express');
var server = (express());
var bodyParser = require('body-parser');
var lowdb = require('lowdb');
var uuid = require('uuid');

var Plant = require('./models/Plant.js')
var port = process.env.PORT || 8080
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
})

server.post('/plants', function(request, response){
  var plant = new Plant(request.body.commonName, request.body.scientificName, request.body.layerType, request.body.use);
  var result = db.get('plants')
                 .push(plant)
                 .last()
                 .value();
  response.send(result);
});

server.put('/plants/:id', function(request, response){
  var updatedPlantInfo = {
    commonName: request.body.commonName,
    scientificName: request.body.scientificName,
    layerType: request.body.layerType,
    use: request.body.use.split(',')
  };

  var updatedPlant = db.get('plants')
                       .find({id: request.params.id})
                       .assign(updatedPlantInfo)
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
