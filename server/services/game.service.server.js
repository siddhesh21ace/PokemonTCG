/**
 * Created by Siddhesh on 4/8/2017.
 */
module.exports = function (app, models) {
    app.get("/api/user/:userID/game", findAllGamesForUser);
    app.post("/api/user/:userID/game", createGame);
    app.put("/api/game/:gameID", updateGame);

    function createGame(req, res) {
        var userID = req.params['userID'];
        var newGame = req.body;

        models.gameModel
            .createGameforUser(userID, newGame)
            .then(function (game) {
                models.userModel
                    .findUserById(userID)
                    .then(function (user) {
                        user.games.push(game._id);
                        user.save();
                        res.json(game);
                    }, function (error) {
                        res.status(404).send(error);
                    })
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findAllGamesForUser(req, res) {
        var userID = req.params['userID'];

        models.gameModel
            .findAllGamesForUser(userID)
            .then(function (games) {
                res.json(games);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function updateGame(req, res) {
        var gameID = req.params['gameID'];
        var updatedGame = req.body;

        models.gameModel
            .updateGame(gameID, updatedGame)
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
};