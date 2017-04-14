(function () {
    angular.module("PokemonWorld")
        .controller("PokemonInfoController", pokemonInfoController);

    function pokemonInfoController(PokeDexService, $routeParams, $rootScope, ReviewService, LikeService) {
        var vm = this;
        vm.like = {};
        vm.like.votes = 100;
        vm.like.userVotes = 0;
        console.log('rootUser ', $rootScope.currentUser);
        vm.reviews = [];
        vm.review = {};
        vm.activeReview = {};
        vm.likeId = "";

        vm.getColorClass = getColorClass;
        vm.getMaxStat = getMaxStat;
        vm.getIndicator = getIndicator;
        vm.likePokemon = likePokemon;
        vm.unlikePokemon = unlikePokemon;

        vm.deleteComment = deleteComment;
        vm.editComment = editComment;
        vm.setActiveReview = setActiveReview;

        vm.addReview = addReview;

        function addReview(review) {
            if (review) {
/*                review.user_id = vm.userID;
                review.pokemon_id = vm.pokemon_id;*/

                review.user_id = "58eff76012f53118b4c1d6a3";
                review.pokemon_id = "58e91532d398239caad8e4af";

                ReviewService.addReview(review)
                    .then(function (response) {
                        vm.reviews = setReviews($routeParams.pokemon);
                        review.title = "";
                        review.description = "";
                    }, function (error) {
                        console.log(error);
                    });
            } else {
                vm.error = "Please enter all the details";
            }
        }

        function init() {
            var pokemon = $routeParams.pokemon;
            console.log("In Pokemon Info controller" + vm.pokemon);

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
                    setReviews(vm.pokemon);
                }, function (error) {
                    vm.error = "Result Not found"
                    console.log("Error" + error);
                })
        }

        init();

        function setReviews(pokemon) {
            ReviewService.findReviewsByPokemonID("58e91532d398239caad8e4af")
                .then(function (response) {
                    vm.reviews = response.data;
                });
        }

        function deleteComment(review) {
            vm.reviews.splice(review, 1);
        }

        function setActiveReview(review) {
            vm.review = review;
        }

        function editComment(review) {
            vm.review = review;
            vm.activeReview = review;
            console.log("review ", review, vm.review);

            for (r in vm.reviews) {
                if (vm.reviews[r]._id === vm.review._id) {
                    vm.reviews[r] = vm.review;
                }
            }
        }

        /* Extras */

        function getColorClass(type) {
            if (type == 'grass') {
                return "grass";
            } else if (type == 'poison') {
                return "poison";
            } else if (type == 'psychic') {
                return "psychic";
            } else if (type == 'bug') {
                return "bug";
            } else if (type == 'fire') {
                return "fire";
            } else if (type == 'ice') {
                return "ice";
            } else if (type == 'ground') {
                return "ground";
            } else if (type == 'flying') {
                return "flying";
            }
        }

        function likePokemon() {
            var like = {
                "user_id" : "58eff76012f53118b4c1d6a3",
                "pokemon_id" : "58e91532d398239caad8e4af"
            }
            LikeService.addLike(like)
                .then(function (response) {
                    console.log(response.data);
                    vm.likeId = response.data._id;
                }, function (error) {
                    console.log(error);
                });
            /*//Check if loggedIN
            console.log($rootScope.currentUser);
            if ($rootScope.currentUser != undefined) {
                console.log("In like pokemon");
                if (vm.like.userVotes == 1) {
                    vm.like.userVotes = 0;
                    vm.like.votes--;
                } else {
                    vm.like.userVotes = 1;
                    vm.like.votes++;
                }
            } else {
                console.log("Need to log in");
            }*/
        }
        
        function unlikePokemon(likeId) {
            LikeService.undoLike(likeId)
                .then(function (response) {
                    console.log(response);
                    vm.likeId = "";
                }, function (error) {
                    console.log(error);
                })
        }

        function getMaxStat(stat) {
            if (stat >= 100) {
                return 150;
            } else {
                return 120;
            }
        }

        function getIndicator(stat) {
            return (stat / 200) * 100;
        }
    }

})();
