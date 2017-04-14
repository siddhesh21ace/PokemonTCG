/**
 * Created by Siddhesh on 4/9/2017.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var projectCardSchema = require('./card.schema.server');
    var CardModel = mongoose.model('CardModel', projectCardSchema);

    var api = {
        "findAllCardsForUser": findAllCardsForUser,
        "findCardByID": findCardByID,
        "addCard": addCard,
        "updateCard": updateCard,
        "deleteCard": deleteCard
    };

    return api;

    function addCard(userId, card) {
        card._user = userId;
        return CardModel.create(card);
    }

    function findCardByID(cardID) {
        return CardModel.findById(cardID);
    }

    function findAllCardsForUser(userId) {
        return CardModel.find({"_user": userId});
    }

    function updateCard(cardID, updatedCard) {
        return CardModel.update({"_id": cardID}, {$set: updatedCard});
    }

    function deleteCard(cardID) {
        return CardModel.remove({"_id": cardID});
    }
}