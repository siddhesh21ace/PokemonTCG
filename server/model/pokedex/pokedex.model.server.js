module.exports = function(app){
    var mongoose = require('mongoose');
    var PokemonSchema = require("./pokedex.schema.server")();
    var PokeDexModel = mongoose.model('PokeDexModel', PokemonSchema);

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
        return PokeDexModel.create(pokemon);
    }


    function fetchPokemons(str){
        return PokeDexModel.find({ name : { $regex: str}});
    }

    function fetchAllPokemons(){
        return PokeDexModel.find();
    }

}