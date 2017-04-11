module.exports = function(app){
    var mongoose = require('mongoose');
    var PokemonSchema = require("./pokedex.schema.server")();
    var PokemonModel = mongoose.model('PokemonModel', PokemonSchema);

    var model={};

    var api = {
        setModel : setModel,
        createPokemons : createPokemons,
        fetchPokemons: fetchPokemons,
        fetchAllPokemons:fetchAllPokemons
    }

    return api;

    function setModel(_model){
        model = _model;
    }

    function createPokemons(pokemon){
        return PokemonModel.create(pokemon);
    }


    function fetchPokemons(str){
        return PokemonModel.find({ name : { $regex: str}});
    }

    function fetchAllPokemons(){
        return PokemonModel.find();
    }

}