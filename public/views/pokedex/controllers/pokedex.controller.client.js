(function () {
    angular.module('PokemonWorld')
        .controller("PokedexController", pokedexController);

    function pokedexController(UserService, $location, PokemonService) {
        var vm = this;

        vm.getResults = getResults;
        vm.getMoreInfo = getMoreInfo;
        vm.fetchPokemons = fetchPokemons;
        vm.selectPokemon = selectPokemon;
        vm.loadMore = loadMore;
        vm.resetResult = resetResult;
        vm.pokemon = {}
        vm.searchResults = {};
        vm.searchResults.name = "";

        vm.selectedPokemon = "";
        vm.pokemonThumbs = [];

        var start = 0;
        var ending = start + 20;
        var lastElement = 811;
        var reachLast = false;
        vm.testData = [];

        vm.loadMore = "Loading More Data .....";

        function resetResult() {
            vm.searchResults = {};
            vm.searchResults.name = "";
        }

        function init() {
            var matches = [];
            var pokemons = [];
            var display = [];

            // hits rest URL

            PokemonService.getAllPokemons()
                .then(function (allPokemons) {
                    pokemons = allPokemons.data.results;

                    for (var i = 0; i < 721; i++) {
                        var pokemon = {}
                        var url = pokemons[i].url;
                        var urlA = "http://assets.pokemon.com//assets/cms2/img/pokedex/detail/";
                        var urlParts = url.split("/");

                        var id = urlParts[6];
                        if (id.toString().length == 1) {
                            id = "00" + id;
                        } else if (id.toString().length == 2) {
                            id = "0" + id;
                        }
                        var imgUrl = urlA + id + ".png";
                        if (id > 721) {
                            imgUrl = "../images/image_not_available.png"
                        }

                        pokemon.name = pokemons[i].name;
                        pokemon.image = imgUrl;
                        pokemon.id = id;
                        display.push(pokemon);
                    }
                });

            vm.pokemonThumbs = display;

            UserService.findCurrentUser()
                .then(function (response) {
                    vm.user = response.data;
                });

            PokemonService.findAllPokemons()
                .then(function (response) {
                    vm.pokemons = response;

                    var allPokemons = response.data;

                    var j = 0;
                    for (var p in allPokemons) {
                        var pokemon = {};
                        pokemon.name = allPokemons[p].name;
                        pokemon.pokedex_number = allPokemons[p].pokedex_number;
                        pokemon._id = allPokemons[p]._id;
                        pokemon.url = "http://assets.pokemon.com//assets/cms2/img/pokedex/detail/" +
                            String(padToThree(pokemon.pokedex_number)) + ".png";

                        if (j < 721) {
                            matches.push(pokemon);
                            j++;
                        }
                    }
                }, function (error) {
                    vm.error = "Result Not found";
                    console.log("Error" + error);
                });
            vm.matches = matches;
        }

        function padToThree(number) {
            if (number <= 999) {
                number = ("00" + number).slice(-3);
            }
            return number;
        }

        init();

        function selectPokemon(pokemon) {
            if (pokemon) {
                vm.pokemon = pokemon;
                getResults(pokemon);
            }
        }

        function fetchPokemons(str) {
            var matches = [];
            console.log("str .." + str)

            PokemonService.findPokemonFromDBByName(str)
                .then(function (response) {
                    vm.pokemons = response;
                    for (r in response) {
                        matches.push({
                            "name": response[r].name,
                        });
                    }
                }, function (error) {
                    vm.error = "Result Not found";
                    console.log("Error" + error);
                });

            vm.matches = matches;
        }

        function getResults(searchTerm) {
            PokemonService.findPokemonFromDBByName(searchTerm.title)
                .then(function (response) {
                    console.log("Pokemon Found" + response);
                    vm.searchResults = response.data;
                    var imageUrlA = "http://assets.pokemon.com//assets/cms2/img/pokedex/detail/";
                    var id = response.data.pokedex_number;

                    vm.searchResults.img = imageUrlA + String(padToThree(id)) + ".png";
                }, function (error) {
                    vm.error = "Result Not found";
                    console.log("Error" + error);
                })
        }

        function getMoreInfo(data) {
            console.log(data);
            $location.url('/pokemon-info/' + data.name);
        }

        function loadMore() {
            var last = vm.pokemonThumbs[vm.pokemonThumbs.length - 1];
            for (var i = 1; i <= vm.pokemonThumbs.length; i++) {
                vm.pokemonThumbs.push(last + i);
            }
        }
    }

})();
