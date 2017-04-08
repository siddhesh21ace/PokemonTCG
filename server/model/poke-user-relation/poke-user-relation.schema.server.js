/**
 * Created by Siddhesh on 4/8/2017.
 */
var mongoose = require('mongoose');

var pokeUserRelationSchema = mongooose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    pokemon_id: {type: mongoose.Schema.Types.ObjectId, ref: 'PokemonModel'},
    liked: Boolean,
    rating: {type : Number, default : 5},
    review: String,
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "project.pokeUserRelation"});

module.exports = pokeUserRelationSchema;