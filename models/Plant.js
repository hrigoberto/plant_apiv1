// requires uuid which is a randomized id creator
var uuid = require('uuid');

// creates a Plant object with all of the specified parameters
function Plant(commonName, scientificName, layerType, use, id){
// tells the id to be either the one alreadty provided, OR || create a new one
  this.id = id || uuid.v4();
  // creates a commonName
  this.commonName = commonName;
  // creates a scientificName
  this.scientificName = scientificName;
  // creates a layerType
  this.layerType = layerType;
  // tells the function that if the use input is a string it should be split at the comma, into an array. else it should just give you the array
    if(typeof use === 'string'){
    this.use = use.split(',');
  } else {
    this.use = use
  }
};

// creates a prototype that allows us to update the Plant in question for the parameter we choose, in this example it's LayerType
Plant.prototype.updateLayerType = function(value){
  this.layerType = value;
};

Plant.prototype.updateUse = function(value){
  this.use = value.split(',');
};

// allows you to export the module to another code file by using node's require function 
module.exports = Plant;
