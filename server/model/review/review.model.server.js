/**
 * Created by Siddhesh on 4/8/2017.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var reviewSchema = require('./review.schema.server');
    var ReviewModel = mongoose.model('ReviewModel', reviewSchema);

    var api = {
        "addReview": addReview,
        "findReviews": findReviews,
        "updateReview": updateReview,
        "deleteReview": deleteReview,
        "findReviewByID": findReviewByID
    };

    return api;

    function addReview(review) {
        delete review._id;
        return ReviewModel.create(review);
    }

    function findReviews(pokemon_id, user_id) {
        var review = {};
        if (pokemon_id) {
            review.pokemon_id = pokemon_id;
        }
        if (user_id) {
            review.user_id = user_id;
        }
        return ReviewModel
            .find(review);
    }

    function updateReview(reviewID, updatedReview) {
        return ReviewModel.update({"_id": reviewID}, {$set: updatedReview});
    }

    function deleteReview(reviewID) {
        return ReviewModel.remove({"_id": reviewID});
    }

    function findReviewByID(reviewID) {
        return ReviewModel.findById(reviewID);
    }

};