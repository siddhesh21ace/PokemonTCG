module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');

    var connectionString = 'mongodb://localhost:27017/PokemonTCG';

    if (process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server")();
    var pokemonModel = require("./pokemon/pokemon.model.server")();
    var likeModel = require("./like/like.model.server")();
    var gameModel = require("./game/game.model.server")();
    var reviewModel = require("./review/review.model.server")();
    var cardModel = require("./card/card.model.server")();

    var models = {
        userModel: userModel,
        pokemonModel: pokemonModel,
        likeModel: likeModel,
        gameModel: gameModel,
        reviewModel: reviewModel,
        cardModel: cardModel
    };

    return models;

};