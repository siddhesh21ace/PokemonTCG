/**
 * Created by Siddhesh on 4/8/2017.
 */
module.exports = function (app, models) {
    app.get("/api/like", findLikes);
    app.post("/api/like", addLike);
    app.delete("/api/like/:likeID", undoLike);

    /* models.pokemonUserRelationModel.addLike("58e92426b3d69d0d98b35c4b", "58e91532d398239caad8e4af");
     models.pokemonUserRelationModel.addLike("58e92426b3d69d0d98b35c4b", "58e91532d398239caad8e4b0");*/

    /*
     models.pokemonUserRelationModel.updateLike({
     "user_id": "58e92426b3d69d0d98b35c4b",
     "pokemon_id": "58e91532d398239caad8e4af",
     "liked": true,
     "rating": 5
     })
     */

    function addLike(req, res) {
        var like = req.body;

        models.likeModel.addLike(like)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                console.log(error);
                res.status(404).send(error);
            })
    }

    function undoLike(req, res) {
        var likeID = req.params['likeID'];

        models.likeModel.deleteLike(likeID)
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
                console.log(error);
                res.status(404).send(error);
            })
    }

};