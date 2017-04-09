(function () {
    angular.module("PokemonWorld")
        .controller("PokemonInfoController", pokemonInfoController);

    function pokemonInfoController(PokeDexService, $routeParams) {
        var vm = this;
        vm.like={};
        vm.like.votes= 100;
        vm.like.userVotes = 0;
        vm.getColorClass = getColorClass;
        vm.getMaxStat =getMaxStat;
        vm.getIndicator =getIndicator;
        vm.likePokemon =likePokemon;

        function init() {
            var pokemon = $routeParams.pokemon;
            console.log("In Pokemon Info controller" + vm.pokemon)

            PokeDexService.fetchPokemonDetails(pokemon)
                .then(function (response) {
                    console.log(response);
                    vm.pokemon = response.data;
                    var urlA = "http://assets.pokemon.com/assets/cms2/img/pokedex/full/";
                    var id = response.data.id;

                    if (id.toString().length == 1) {
                        id = "00" + id;
                    } else if (id.toString().length == 2) {
                        id = "0" + id;
                    }

                    var imgUrl = urlA + id + ".png";
                    if (id > 721) {
                        imgUrl = "../images/image_not_available.png"
                    }

                    vm.pokemon.img = imgUrl;
                }, function (error) {
                    vm.error = "Result Not found"
                    console.log("Error" + error);
                })
        }

        init();

        function getColorClass(type){

            if (type == 'grass') {
                return "grass";
            }else if(type == 'poison'){
                return "poison";
            } else if(type == 'psychic'){
                return "psychic";
            } else if (type == 'bug'){
                return "bug";
            } else if(type == 'fire'){
                return "fire";
            } else if(type == 'ice'){
                return "ice";
            } else if(type == 'ground') {
                return "ground";
            } else if(type == 'flying') {
                return "flying";
            }


        }

        function likePokemon(){
            console.log("In like pokemon");
            if(vm.like.userVotes == 1){
               vm.like.userVotes = 0;
               vm.like.votes--;
            } else {
                vm.like.userVotes = 1;
                vm.like.votes++;
            }
        }

        function getMaxStat(stat){
            if(stat >= 100){
                return 150;
            } else {
                return 120;
            }
        }

        function getIndicator(stat){
            if(stat >= 90){
                return 90;
            } else {
                return stat;
            }
        }
    }

})();
