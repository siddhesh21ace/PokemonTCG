(function () {
    angular.module("PokemonWorld")
        .controller("PokemonInfoController", pokemonInfoController);

    function pokemonInfoController(PokeDexService, $routeParams, $rootScope, ReviewService, LikeService, UserService, PokemonService) {
        var vm = this;
        vm.like = {};
        vm.like.votes = 100;
        vm.like.userVotes = 0;
        vm.reviews = [];
        vm.review = {};
        vm.activeReview = {};
        vm.likeId = "";
        vm.user = {};
        vm.pokemon = {};
        vm.isLiked = false;
        vm.getColorClass = getColorClass;
        vm.getMaxStat = getMaxStat;
        vm.getIndicator = getIndicator;
        vm.likePokemon = likePokemon;
        vm.unlikePokemon = unlikePokemon;

        vm.isLoggedInUser = isLoggedInUser;
        vm.getMoreInfo = getMoreInfo;

        vm.addReview = addReview;
        vm.isPokemonLiked = isPokemonLiked;

        vm.likePuokemon = likePokemon;
        vm.unlikePokemon = unlikePokemon;
        vm.isPokemonLiked = isPokemonLiked;

        vm.avgRating = 0;
        vm.totalLikes = 0;

        function totalLikes() {
            LikeService.getPokemonLikes(vm.pokemon._id)
                .then(function (response) {
                    vm.totalLikes = response.data.length;
                });
        }

        function pokemonAvgRating(reviews) {
            var avgRating = 0;
            for (var i = 0; i < reviews.length; i++) {
                avgRating += parseInt(reviews[i].rating);
            }
            vm.avgRating = (avgRating / reviews.length);
            if (isNaN(vm.avgRating)) {
                vm.avgRating = 0;
            }
        }

        function addReview(review) {
            if (review) {
                review.user_id = vm.user._id;
                review.pokemon_id = vm.pokemon._id;

                ReviewService.addReview(review)
                    .then(function (response) {
                        setReviews(vm.pokemon);
                        review.rating = 0;
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
            $('[data-toggle="tooltip"]').tooltip();

            var pokemon = $routeParams.pokemon;
            console.log("In Pokemon Info controller" + pokemon);

            PokemonService.findPokemonByPokeId(pokemon)
                .then(function (response) {
                    console.log(response);
                    vm.pokemon = response.data;

                    var evoChain = vm.pokemon.species.evoChain;

                    for (e in evoChain) {
                        var urlA = "http://assets.pokemon.com//assets/cms2/img/pokedex/detail/";
                        var id = evoChain[e].species_id;

                        if (id.toString().length == 1) {
                            id = "00" + id;
                        } else if (id.toString().length == 2) {
                            id = "0" + id;
                        }

                        var imgUrl = urlA + id + ".png";

                        evoChain[e].img = imgUrl;
                        evoChain[e].name = evoChain[e].species_name;
                        evoChain[e].species_id = evoChain[e].species_id;

                    }

                    vm.pokemon.species.evoChain = evoChain;


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
                    return PokemonService.findPokemonFromDBByName(pokemon);
                }, function (error) {
                    vm.error = "Result Not found";
                    console.log("Error" + error);
                })
                .then(function (response) {
                    vm.pokemon._id = response.data._id;
                    setReviews(vm.pokemon);
                    isPokemonLiked();
                    totalLikes();
                });


            UserService.findCurrentUser()
                .then(function (response) {
                    vm.user = response.data;
                });
        }

        init();

        function setReviews(pokemon) {
            ReviewService.findReviewsByPokemonID(pokemon._id)
                .then(function (response) {
                    vm.reviews = response.data;
                    pokemonAvgRating(vm.reviews);
                });
        }

        function isLoggedInUser() {
            if (vm.user)
                return true;
            else
                return false;
        }

        function getMoreInfo(data) {
            console.log(data);
            $location.url('/pokemon-info/' + data);

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
            } else if (type == 'water') {
                return "water";
            } else if (type == 'ice') {
                return "ice";
            } else if (type == 'ground') {
                return "ground";
            } else if (type == 'flying') {
                return "flying";
            } else if (type == 'electric') {
                return "electric";
            } else if (type == 'rock') {
                return "rock";
            } else if (type == 'fighting') {
                return "fighting";
            } else if (type == 'normal') {
                return "normal";
            }
        }

        function likePokemon() {
            var like = {
                "user_id": vm.user._id,
                "pokemon_id": vm.pokemon._id
            };

            LikeService.addLike(like)
                .then(function (response) {
                    console.log(response.data);
                    vm.isLiked = true;
                    totalLikes();
                }, function (error) {
                    console.log(error);
                });
        }

        function unlikePokemon() {
            LikeService.undoLike(vm.user._id, vm.pokemon._id)
                .then(function (response) {
                    console.log(response);
                    vm.isLiked = false;
                    totalLikes();
                }, function (error) {
                    console.log(error);
                })
        }

        function isPokemonLiked() {
            LikeService
                .isPokemonLiked(vm.user._id, vm.pokemon._id)
                .then(function (response) {
                    var liked = response.data;
                    if (liked.length > 0) {
                        console.log(liked);
                        vm.isLiked = true;
                    }
                    else {
                        vm.isLiked = false;
                    }
                });
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
