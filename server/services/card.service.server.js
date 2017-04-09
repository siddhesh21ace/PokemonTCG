/**
 * Created by Siddhesh on 4/9/2017.
 */
module.exports = function (app, models) {
    app.get("/api/user/:userID/card", findCardsByUser);
    app.get("/api/card/:cardID", findCardByID);
    app.post("/api/user/:userID/card", addCard);
    app.put("/api/card/:cardID", updateCard);
    app.delete("/api/card/:cardID", deleteCard);

    function addCard(req, res) {
        var userID = req.params['userID'];
        var newCard = req.body;

        models.cardModel
            .addCard(userID, newCard)
            .then(function (card) {
                models.userModel
                    .findUserById(userID)
                    .then(function (user) {
                        user.cards.push(card._id);
                        user.save();
                        res.json(card);
                    }, function (error) {
                        res.status(404).send(error);
                    })
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findCardsByUser(req, res) {
        var userID = req.params['userID'];

        models.cardModel
            .findAllCardsForUser(userID)
            .then(function (cards) {
                res.json(cards);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findCardByID(req, res) {
        var cardID = req.params['cardID'];

        models.cardModel
            .findCardByID(cardID)
            .then(function (card) {
                res.json(card);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function updateCard(req, res) {
        var cardID = req.params['cardID'];
        var updatedCard = req.body;

        models.cardModel
            .updateCard(cardID, updatedCard)
            .then(function (response) {
                if (response.ok === 1 && response.n === 1) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function deleteCard(req, res) {
        var cardID = req.params['cardID'];

        models.cardModel.findCardByID(cardID)
            .then(function (card) {
                models.userModel.findUserById(card._user)
                    .then(function (user) {
                        user.cards.pull(cardID);
                        user.save();

                        models.cardModel.deleteCard(cardID)
                            .then(function (response) {
                                if (response.result.n === 1 && response.result.ok === 1) {
                                    res.sendStatus(200);
                                }
                                else {
                                    res.sendStatus(404);
                                }
                            }, function (error) {
                                res.status(404).send('Card not found to delete' + error);
                            });
                    }, function (error) {
                        res.status(404).send(error);
                    });
            }, function (error) {
                res.status(404).send(error);
            });
    }
};