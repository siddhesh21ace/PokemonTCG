/**
 * Created by Siddhesh on 4/4/2017.
 */
(function () {
    angular.module("PokemonWorld")
        .service("PokeDexService", PokeDexService);

    function PokeDexService($http) {
        var api = {
            "getPokemonDetails": getPokemonDetails,
            "getPokedexSearchResults": getPokedexSearchResults,
            "fetchPokemons": fetchPokemons,
            "fetchAllPokemons": fetchAllPokemons,
            "getPokemonsThumbs": getPokemonsThumbs,
            "fetchPokemonDetails": fetchPokemonDetails
        };

        return api;

        function fetchPokemonDetails(pokemon) {
            return $http.get("/rest/api/pokemon/" + pokemon);
        }

        function getPokemonsThumbs() {
            return $http.get('/api/pokedex/getAllPokemons/');
        }

        function fetchPokemons(str) {
            return $http.get('/api/pokedex/fetchPokemons/' + str);
        }

        function fetchAllPokemons() {
            return $http.get('/api/pokedex/fetchAllPokemons/');
        }

        function getPokedexSearchResults(query, category) {
            var pokedex = {
                query: query,
                category: category
            }

            return $http.post('/api/pokedex/getPokedexSearch/', pokedex);
        }

        function getPokemonDetails(pokemon) {

            return $http.get('/api/pokedex/getPokemonDetails/' + pokemon);
        }
    }
})();