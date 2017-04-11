(function () {
    angular.module("PokemonWorld")
        .controller("PokemonInfoController", pokemonInfoController);

    function pokemonInfoController(PokeDexService, $routeParams, $rootScope) {
        var vm = this;
        vm.like={};
        vm.like.votes= 100 ;
        vm.like.userVotes = 0;
        console.log('rootUser ', $rootScope.currentUser );
        vm.reviews =[
            {"_id": 1, "title": "Pika Pika", "comment":"pika pika pika pikapika pika pika pikapika pika pika pikapika pika pika pikapika pika pika pikapika pika pika pika"},
            {"_id": 2, "title": "Pikachu", "comment":"pika pika pika pikapika pika pika pikapika pika pika pikapika pika pika pikapika pika pika pikapika pika pika pika"},
            {"_id": 3, "title": "Pika Pika1", "comment":"pika pika pika pikapika pika pika pikapika pika pika pikapika pika pika pikapika pika pika pikapika pika pika pika"},
            {"_id": 4, "title": "Pika Pika2", "comment":"pika pika pika pikapika pika pika pikapika pika pika pikapika pika pika pikapika pika pika pikapika pika pika pika"},
        ];
        vm.review = {};
        vm.activeReview={};
        vm.getColorClass = getColorClass;
        vm.getMaxStat =getMaxStat;
        vm.getIndicator =getIndicator;
        vm.likePokemon =likePokemon;
        vm.deleteComment =deleteComment;
        vm.editComment = editComment;
        vm.setActiveReview = setActiveReview;

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

        function deleteComment(review){
            vm.reviews.splice(review,1);
        }

        function setActiveReview(review){
            vm.review = review;
        }

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

        function editComment(review){
            vm.review = review;
            vm.activeReview = review;
            console.log("review ", review, vm.review);

            for(r in vm.reviews){
                if(vm.reviews[r]._id === vm.review._id){
                    vm.reviews[r] = vm.review;
                }
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
            return (stat/200) * 100;
        }
    }

})();
