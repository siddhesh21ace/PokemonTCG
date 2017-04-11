/**
 * Created by Siddhesh on 4/8/2017.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var projectGameSchema = require('./game.schema.server');
    var GameModel = mongoose.model('GameModel', projectGameSchema);

    var api = {
        "createGameforUser": createGameforUser,
        "findAllGamesForUser": findAllGamesForUser,
        "updateGame": updateGame
    };

    return api;

    function createGameforUser(userID, newGame) {
        newGame._user = userID;
        return GameModel.create(newGame);
    }

    function findAllGamesForUser(userID) {
        return GameModel.find({"_user": userID});
    }

    function updateGame(gameID, updatedGame) {
        return GameModel.update({"_id": gameID}, {$set: updatedGame});
    }
};