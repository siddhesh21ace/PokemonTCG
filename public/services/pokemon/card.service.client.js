/**
 * Created by Siddhesh on 4/4/2017.
 */
(function () {
    angular.module("PokemonWorld")
        .service("PokemonTCGService", pokemonTCGService);

    function pokemonTCGService($http) {
        var endPoint = "/api/card?";
        var setsURL = "https://api.pokemontcg.io/v1/sets";

        var api = {
            "getAllSets": getAllSets,
            "getPokemonsBySet": getPokemonsBySet,
            "getAllPokemons": getAllPokemons

        }
        return api;

        /* Testing Purpose for now */
        function getAllSets() {
            return $http.get(setsURL);
        }
        
        function getPokemonsBySet(setCode) {
            return $http.get(endPoint + "setCode=" + setCode);
        }
        
        function getAllPokemons() {
            return $http.get("/api/card");
        }
    }
})();