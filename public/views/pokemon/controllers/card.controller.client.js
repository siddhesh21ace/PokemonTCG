(function () {
    angular.module("PokemonWorld")
        .controller("PokemonController", pokemonController);

    function pokemonController(PokemonTCGService) {
        var vm = this;
        vm.getPokemons = getPokemons;

        function init() {
            PokemonTCGService.getAllSets()
                .then(function (response) {
                    vm.sets = response.data;
                }, function (error) {
                    console.log(error);
                });
        }

        init();

        function getPokemons(setCode) {
            PokemonTCGService.getPokemonsBySet(setCode)
                .then(function (response) {
                    vm.pokemons = response.data;
                }, function (error) {
                    console.log(error);
                })
        }
    }

})();
