module.exports = function(){

    var mongoose = require('mongoose');

    var PokemonSchema = mongoose.Schema({
        name : String,
        url: String,
        dateCreated: Date,
    }, {collection: 'pokemon'});

    return PokemonSchema;

}