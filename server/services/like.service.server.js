/**
 * Created by Siddhesh on 4/8/2017.
 */
module.exports = function (app, models) {
    app.get("/api/like", findLikes);
    app.post("/api/like", addLike);
    app.delete("/api/like/:likeID", undoLike);

    /*var like1 = {
        "user_id" : "58eff76012f53118b4c1d6a3",
        "pokemon_id" : "58e91532d398239caad8e4af"
    };
    var like2 = {
        "user_id" : "58eff76012f53118b4c1d6a3",
        "pokemon_id" : "58e91532d398239caad8e4b0"
    };
    var like3 = {
        "user_id" : "58eff76012f53118b4c1d6a3",
        "pokemon_id" : "58e91532d398239caad8e4b1"
    };
    models.likeModel.addLike(like1)
        .then(function (response) {
            console.log("Success1");
        });
    models.likeModel.addLike(like2)
        .then(function (response) {
            console.log("Success2");
        });
    models.likeModel.addLike(like3)
        .then(function (response) {
            console.log("Success3");
        });*/

/*     models.pokemonUserRelationModel.updateLike({
     "user_id": "58e92426b3d69d0d98b35c4b",
     "pokemon_id": "58e91532d398239caad8e4af",
     "liked": true,
     "rating": 5
     })*/

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