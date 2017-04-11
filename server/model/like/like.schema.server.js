/**
 * Created by Siddhesh on 4/8/2017.
 */
var mongoose = require('mongoose');

var likeSchema = mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    pokemon_id: {type: mongoose.Schema.Types.ObjectId, ref: 'PokemonModel'},
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "project.like"});

module.exports = likeSchema;