/**
 * Created by Siddhesh on 4/9/2017.
 */
(function () {
    angular.module("PokemonWorld")
        .service("ReviewService", reviewService);

    function reviewService($http) {
        var api = {
            "findReviewsByPokemonID": findReviewsByPokemonID,
            "addReview": addReview
        };
        return api;

        function addReview(review) {
            return $http.post("/api/review", review);
        }

        function findReviewsByPokemonID(pokemonID) {
            return $http.get("/api/review?pokemon_id=" + pokemonID);
        }
    }
})();