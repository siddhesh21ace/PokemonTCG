/**
 * Created by Siddhesh on 4/7/2017.
 */

(function () {
    angular.module("PokemonWorld")
        .service("PokemonService", pokemonService);

    function pokemonService($http) {
        var endPoint = "/rest/api/card?";
        var setsURL = "https://api.pokemontcg.io/v1/sets";

        var api = {
            "getAllSets": getAllSets,
            "getPokemonsBySet": getPokemonsBySet,
            "findPokemonByPokeId": findPokemonByPokeId,
            "findPokemonById": findPokemonById,
            "getAllPokemons": getAllPokemons,
            "findPokemonByName": findPokemonByName,
            "findPokemonFromDBByName": findPokemonFromDBByName,
            "findAllPokemons": findAllPokemons
        }
        return api;

        function findPokemonFromDBByName(pokemonName) {
            return $http.get("/api/pokemon?name=" + pokemonName);
        }

        function findPokemonByPokeId(pokemonID) {
            return $http.get("/rest/api/pokemon/" + pokemonID);
        }

        function findPokemonById(pokemonID) {
            return $http.get("/api/pokemon/" + pokemonID);
        }

        function getAllPokemons() {
            return $http.get("/rest/api/pokemon");
        }

        function findPokemonByName(name) {
            return $http.get("/rest/api/pokemon?name=" + name);
        }
        
        function findAllPokemons() {
            return $http.get("/api/pokemon");
        }

        /* Testing Purpose for now */
        function getAllSets() {
            return $http.get(setsURL);
        }

        function getPokemonsBySet(setCode) {
            return $http.get(endPoint + "setCode=" + setCode);
        }
    }
})();