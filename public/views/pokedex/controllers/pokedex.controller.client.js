(function () {
    angular.module('PokemonWorld')
        .controller("PokedexController", pokedexController);

    function pokedexController(PokeDexService, $location) {
        var vm = this;

        vm.getResults = getResults;
        vm.getMoreInfo = getMoreInfo;
        vm.insertData = insertData;
        vm.fetchPokemons =fetchPokemons;
        vm.selectPokemon = selectPokemon;
        vm.loadMore = loadMore;
       // vm.listData = listData;

        vm.selectedPokemon="";
        vm.pokemonThumbs=[];

        var start=0;
        var ending = start+20;
        var lastElement=811;
        var reachLast = false;
        vm.testData =[];

        vm.loadMore = "Loading More Data .....";

        function init() {
            var matches=[];
            var pokemons=[];
            var display=[];

            console.log("In Pokedex controller");

            PokeDexService.getPokemonsThumbs()
                .then(function (allPokemons){
                    pokemons=allPokemons.data;
                    console.log(pokemons.length);

                    for(var i = 0; i < pokemons.length; i++) {
                        var pokemon = {}
                        var url= pokemons[i].url;
                        var urlA = "http://assets.pokemon.com//assets/cms2/img/pokedex/detail/";
                        var urlParts= url.split("/");

                        var id= urlParts[6];
                        if (id.toString().length == 1) {
                            id = "00" + id;
                        } else if (id.toString().length == 2) {
                            id = "0" + id;
                        }
                        var imgUrl = urlA + id + ".png";
                        if(id > 721) {
                            imgUrl = "../images/image_not_available.png"
                        }

                        pokemon.name= pokemons[i].name;
                        pokemon.image = imgUrl;
                        pokemon.id=id;
                        display.push(pokemon);
                    }
                });
            console.log(display);
           vm.pokemonThumbs = display;

            PokeDexService.fetchAllPokemons()
                .then(function (response) {
                    vm.pokemons = response;

                    var allPokemons = response.data;

                    for(p in allPokemons){
                        var pokemon={};
                        pokemon.name= allPokemons[p].name;
                        pokemon.url = allPokemons[p].url;
                        matches.push(pokemon);
                    }
                }, function (error) {
                    vm.error= "Result Not found"
                    console.log("Error"+ error);
                })
            vm.matches = matches;
        }

        init();

        // function listData() {
        //     if(reachLast){
        //         return false;
        //     }
        //     var jsondt = [];
        //     for (var i = start; i < ending; i++) {
        //         jsondt.push(display[i]);
        //     };
        //     start = i;
        //     ending = i+20;
        //
        //     vm.testData =vm.testData.concat(jsondt);
        //
        //
        //     if(ending >= lastdata) {
        //         reachLast = true;
        //         vm.loadmore = "Reached at bottom";
        //     }
        // };
        //
        //
        // listData();

        function selectPokemon(pokemon){
            if(pokemon){
                vm.pokemon = pokemon;
                getResults(pokemon, "pokemon");
            }
        }

        function fetchPokemons(str){
            var matches= [];
            console.log("str .."+ str)

            PokeDexService.fetchPokemons(str)
                .then(function (response) {
                    vm.pokemons = response;
                    for(r in response){
                        matches.push({"name": response[r].name, "url": response[r].url});
                    }
                }, function (error) {
                    vm.error= "Result Not found"
                    console.log("Error"+ error);
                })

            console.log(matches);
            vm.matches = matches;
        }

        function getResults(searchTerm, category) {
            console.log(searchTerm, category);
            PokeDexService.getPokedexSearchResults(searchTerm.title,category)
                .then(function (response) {
                    console.log("Pokemon Found"+response);
                    vm.searchResults = response.data;
                    var imageUrlA = "http://assets.pokemon.com//assets/cms2/img/pokedex/detail/";
                    var id = response.data.id;

                    if(id.toString().length == 1){
                        id="00"+id;
                    } else if(id.toString().length == 2){
                        id="0"+id;
                    }
                    vm.searchResults.img = imageUrlA+id+".png";
                }, function (error) {
                    vm.error= "Result Not found"
                    console.log("Error"+ error);
                })
        }

        function insertData(){
            PokeDexService.insertData()
                .then(function (response) {
                    console.log(response);
                    vm.error = "Success!!!";
                }, function (error) {
                    vm.error= "Result Not found"
                    console.log("Error"+ error);
                })
        }

        function getMoreInfo(data) {
            console.log(data);
            $location.url('/pokemon-info/'+data.name);

        }

        function loadMore() {
            var last = vm.pokemonThumbs[vm.pokemonThumbs.length - 1];
            for(var i = 1; i <= vm.pokemonThumbs.length; i++) {
                vm.pokemonThumbs.push(last + i);
            }
        };
    }

})();
