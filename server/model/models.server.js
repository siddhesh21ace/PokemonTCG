module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');

    var connectionString = 'mongodb://localhost/PokemonTCG';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server")();
    var pokemonModel = require ("./pokemon/pokedex.model.server")();

    var models = {
        userModel: userModel,
        pokemonModel: pokemonModel
    };

    pokemonModel.setModel(model);

    return models;

};