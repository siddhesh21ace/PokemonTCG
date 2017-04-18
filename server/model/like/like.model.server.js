/**
 * Created by Siddhesh on 4/8/2017.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var likeSchema = require('./like.schema.server');
    var LikeModel = mongoose.model('LikeModel', likeSchema);

    var api = {
        "addLike": addLike,
        "deleteLike": deleteLike,
        "findLikes": findLikes
    };

    return api;

    function addLike(like) {
        delete like._id;
        return LikeModel.create(like);
    }

    function deleteLike(pokemon_id, user_id) {
        return LikeModel.remove({"user_id": user_id, "pokemon_id": pokemon_id});
    }

    function findLikes(pokemon_id, user_id) {
        var like = {};
        if (pokemon_id) {
            like.pokemon_id = pokemon_id;
        }
        if (user_id) {
            like.user_id = user_id;
        }
        return LikeModel
            .find(like);
    }

};