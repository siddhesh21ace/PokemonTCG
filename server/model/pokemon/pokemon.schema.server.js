/**
 * Created by Siddhesh on 4/8/2017.
 */
var mongoose = require("mongoose");

var projectPokemonSchema = mongoose.Schema({
    pokedex_number: Number,
    name: String,
    types: [String]
}, {collection: "project.pokemon"});

module.exports = projectPokemonSchema;