module.exports = function () {

    var userModel = require("./user/user.model.server")();
    var pokemonModel = require("./pokemon/pokemon.model.server")();

    var models = {
        userModel: userModel,
        pokemonModel: pokemonModel
    };

    return models;
};