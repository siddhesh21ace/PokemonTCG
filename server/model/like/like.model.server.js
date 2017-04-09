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

    function deleteLike(likeID) {
        return LikeModel.remove({"_id": likeID});
    }

    function findLikes(pokemon_id, user_id) {
        var like = {
            "pokemon_id": pokemon_id
        };
        if (user_id) {
            like.user_id = user_id;
        }
        return LikeModel
            .find(like);
    }

    /*    function addLike(userId, pokemonId) {
     PokeUserRelationModel.create({"pokemon_id": pokemonId, "user_id": userId});
     console.log("Done");
     }*/

};