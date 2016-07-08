var uuid = require('uuid');

function Plant(commonName, scientificName, layerType, use, id){
  this.id = id || uuid.v4();
  this.commonName = commonName;
  this.scientificName = scientificName;
  this.layerType = layerType;
  this.use = use.split(',');
}

module.exports = Plant;
