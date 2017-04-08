module.exports = function() {
    var mongoose = require('mongoose');

    var connectionString = 'mongodb://localhost/PokemonTCG';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    mongoose.connect(connectionString);

    var pokemonModel = require ("./pokemon/pokedex.model.server")();

    var model = {
        pokemonModel: pokemonModel
    };

    pokemonModel.setModel(model);

    return model;

};