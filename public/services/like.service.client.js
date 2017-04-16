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
            "undoLike": undoLike,
            "isPokemonLiked": isPokemonLiked,
            "getPokemonLikes": getPokemonLikes
        };
        return api;

        function findLikedPokemonsByUser(userID) {
            return $http.get("/api/like?user_id=" + userID);
        }

        function addLike(like) {
            return $http.post("/api/like", like);
        }

        function undoLike(userID, pokemonID) {
            return $http.delete("/api/like?user_id=" + userID + "&pokemon_id=" + pokemonID);
        }

        function isPokemonLiked(userID, pokemonID) {
            return $http.get("/api/like?user_id=" + userID + "&pokemon_id=" + pokemonID);
        }

        function getPokemonLikes(pokemonID) {
            return $http.get("/api/like?pokemon_id=" + pokemonID);
        }

    }
})();