/**
 * Created by Siddhesh on 4/8/2017.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var projectPokemonSchema = require('./pokemon.schema.server');
    var PokemonModel = mongoose.model('PokemonModel', projectPokemonSchema);

    var api = {
        "createPokemon": createPokemon,
        "findPokemonById": findPokemonById,
        "findPokemonByPokeId": findPokemonByPokeId,
        "findPokemonByName": findPokemonByName,
        "getAllPokemons": getAllPokemons
    };

    return api;

    //createPokemons
    function createPokemon(pokemon) {
        delete pokemon._id;
        return PokemonModel.create(pokemon);
    }

    function findPokemonById(pokemonId) {
        return PokemonModel.findById(pokemonId);
    }

    function findPokemonByPokeId(pokeId) {
        return PokemonModel.findOne({"poke_id" : pokeId});
    }

    //fetchPokemons
    function findPokemonByName(name) {
        // return PokemonModel.findOne({"name": name});
        return PokemonModel.findOne({"name": {
            $regex: new RegExp(name, "ig")
        }});
    }

    // fetchAllPokemons
    function getAllPokemons() {
        return PokemonModel.find();
    }

};