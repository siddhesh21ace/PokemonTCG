module.exports = function () {

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