(function () {
    angular.module("PokemonWorld")
        .controller("PokemonInfoController", pokemonInfoController);

    function pokemonInfoController(PokeDexService, $routeParams) {
        var vm = this;

        function init() {
            var pokemon= $routeParams.pokemon;
            console.log("In Pokemon Info controller"+ vm.pokemon)

            PokeDexService.getPokemonDetails(pokemon)
                .then(function (response) {
                    console.log(response);
                    vm.pokemon = response.data;
                    var urlA= "http://assets.pokemon.com/assets/cms2/img/pokedex/full/";
                    var id = response.data.id;

                    if(id.toString().length == 1){
                        id="00"+id;
                    } else if(id.toString().length == 2){
                        id="0"+id;
                    }

                    var imgUrl = urlA+id+".png";
                    if(id > 721) {
                        imgUrl = "../images/image_not_available.png"
                    }

                    vm.pokemon.img = imgUrl;
                }, function (error) {
                    vm.error= "Result Not found"
                    console.log("Error"+ error);
                })
        }

        init();
    }

})();
