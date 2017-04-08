/**
 * Created by Siddhesh on 4/8/2017.
 */
var mongoose = require("mongoose");

var projectPokemonSchema = mongoose.Schema({
    poke_id: String,
    name: String,
    type: [String],
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
}, {collection: "project.pokemon"});

// projectPokemonSchema.index({id:1},{unique:true});

module.exports = projectPokemonSchema;