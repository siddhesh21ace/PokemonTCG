/**
 * Created by Siddhesh on 4/8/2017.
 */

var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    pokemon_id: {type: mongoose.Schema.Types.ObjectId, ref: 'PokemonModel'},
    rating: {type: Number, default: 5},
    title: {type: String},
    description: {type: String},
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "project.review"});

module.exports = reviewSchema;