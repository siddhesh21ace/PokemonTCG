/**
 * Created by Siddhesh on 4/8/2017.
 */
module.exports = function (app, models) {
    app.get("/api/review", findReviews);
    app.post("/api/review", addReview);
    app.put("/api/review/:reviewID", updateReview);
    app.delete("/api/review/:reviewID", deleteReview);

    /*
     models.pokemonUserRelationModel.addLike("58e92426b3d69d0d98b35c4b", "58e91532d398239caad8e4af");
     models.pokemonUserRelationModel.addLike("58e92426b3d69d0d98b35c4b", "58e91532d398239caad8e4b0");
     */

    /*
     models.pokemonUserRelationModel.updateLike({
     "user_id": "58e92426b3d69d0d98b35c4b",
     "pokemon_id": "58e91532d398239caad8e4af",
     "liked": true,
     "rating": 5
     })
     */

/*    models.reviewModel.addReview({
        "user_id": "58e92426b3d69d0d98b35c4b",
        "pokemon_id": "58e91532d398239caad8e4af",
        "reviewText": "This is awesome!",
        "rating": 4
    })
        .then(function (response) {
            console.log(response)
        });*/

    function updateReview(req, res) {
        var reviewID = req.params['reviewID'];
        var updatedReview = req.body;

        models.reviewModel
            .updateReview(reviewID, updatedReview)
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

    function deleteReview(req, res) {
        var reviewID = req.params['reviewID'];

        models.reviewModel.deleteReview(reviewID)
            .then(function (response) {
                if (response.result.n === 1 && response.result.ok === 1) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (error) {
                res.status(404).send('Review not found to delete' + error);
            });
    }

    function findReviews(req, res) {
        var pokemon_id = req.query.pokemon_id;
        var user_id = req.query.user_id;

        models.reviewModel.findReviews(pokemon_id, user_id)
            .then(function (response) {
                res.json(response)
            }, function (error) {
                console.log(error);
                res.status(404).send(error);
            })
    }

    function addReview(req, res) {
        var review = req.body;

        models.reviewModel.addReview(review)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                console.log(error);
                res.status(404).send(error);
            })
    }

}