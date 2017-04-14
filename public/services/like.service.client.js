/**
 * Created by Siddhesh on 4/9/2017.
 */
(function () {
    angular.module("PokemonWorld")
        .service("LikeService", likeService);

    function likeService($http) {
        var api = {
            "findLikedPokemonsByUser": findLikedPokemonsByUser,
            "addLike": addLike,
            "undoLike": undoLike
        };
        return api;

        function findLikedPokemonsByUser(userID) {
            return $http.get("/api/like?user_id=" + userID);
        }

        function addLike(like) {
            return $http.post("/api/like", like);
        }

        function undoLike(likeId) {
            return $http.delete("/api/like/" +  likeId);
        }
    }
})();