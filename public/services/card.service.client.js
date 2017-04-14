/**
 * Created by Siddhesh on 4/4/2017.
 */
(function () {
    angular.module("PokemonWorld")
        .service("CardService", cardService);

    function cardService($http) {
        var endPoint = "/rest/api/card?";
        var setsURL = "https://api.pokemontcg.io/v1/sets";

        var api = {
            "getAllSets": getAllSets,
            "getPokemonsBySet": getPokemonsBySet,
            "getAllPokemons": getAllPokemons,
            "findCardsByUser": findCardsByUser,
            "findCardByTCGID": findCardByTCGID,
            "addCard": addCard
        };
        return api;

        function addCard(userID, card) {
            return $http.post("/api/user/" + userID + "/card", card);
        }

        function findCardsByUser(userID) {
            return $http.get("/api/user/" + userID + "/card");
        }

        function findCardByTCGID(tcgID) {
            return $http.get("/rest/api/card/" + tcgID);
        }

        /* Testing Purpose for now */
        function getAllSets() {
            return $http.get(setsURL);
        }
        
        function getPokemonsBySet(setCode) {
            return $http.get(endPoint + "setCode=" + setCode);
        }
        
        function getAllPokemons() {
            return $http.get("/rest/api/card");
        }
    }
})();