/**
 * Created by Siddhesh on 4/8/2017.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var projectPokeUserRelationSchema = require('./poke-user-relation.schema.server');
    var PokeUserRelationModel = mongoose.model('PokeUserRelationModel', projectPokeUserRelationSchema);

    var api = {
        "addLike" : addLike,
        "update" : updateLike,
        "addRating" : addRating,
        "updateRating" : updateRating,
        "addReview" : addReview,
    };

    return api;

    function addLike() {

    }

    function updateLike() {

    }

    function addRating() {

    }

    function updateRating() {

    }

    function addReview() {

    }

};