/**
 * Created by Siddhesh on 4/8/2017.
 */
module.exports = function (app, models) {
    app.get("/api/like", findLikes);
    app.post("/api/like", addLike);
    app.delete("/api/like", undoLike);

    function addLike(req, res) {
        var like = req.body;

        models.likeModel.addLike(like)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status(404).send(error);
            })
    }

    function undoLike(req, res) {
        var pokemon_id = req.query.pokemon_id;
        var user_id = req.query.user_id;

        models.likeModel.deleteLike(pokemon_id, user_id)
            .then(function (response) {
                if (response.result.n === 1 && response.result.ok === 1) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (error) {
                res.status(404).send('Like not found to delete' + error);
            });
    }

    function findLikes(req, res) {
        var pokemon_id = req.query.pokemon_id;
        var user_id = req.query.user_id;

        models.likeModel.findLikes(pokemon_id, user_id)
            .then(function (response) {
                res.json(response)
            }, function (error) {
                res.status(404).send(error);
            })
    }

};