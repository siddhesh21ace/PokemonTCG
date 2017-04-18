(function () {
    angular.module("PokemonWorld")
        .controller("HomeController", HomeController);

    function HomeController($location, UserService, GameService) {
        var vm = this;

        vm.logout = logout;
        vm.user = {};
        vm.scores = [];

        function init() {
            UserService.findCurrentUser()
                .then(function (response) {
                    vm.user = response.data;
                });

            UserService.getAllPlayers()
                .then(function (response) {

                    /*Initialize Theater for pokemon names*/
                    var theater = theaterJS();

                    theater
                        .on('type:start, erase:start', function () {
                            // add a class to actor's dom element
                            var actor = theater.getCurrentActor();
                            actor.$element.classList.add('is-typing')
                        })
                        .on('type:end, erase:end', function () {
                            // and then remove it when he's done
                            var actor = theater.getCurrentActor()
                            actor.$element.classList.remove('is-typing')
                        })


                    theater.addActor('vader', 0.8)

                    theater
                        .addScene('vader:Pikachu...', 400)
                        .addScene('vader:Bulbasaur...', 400)
                        .addScene('vader:Venusaur...', 400)
                        .addScene('vader:Ivysaur...', 400)
                        .addScene('vader:Charmeleon...', 400)
                        .addScene('vader:Blastoise...', 400)
                        .addScene('vader:Kakuna...', 400)
                        .addScene('vader:caterpie...', 400)
                        .addScene('vader:Pikachu...', 400)
                        .addScene('vader:wartortle...', 400)
                        .addScene('vader:beedrill...', 400)
                        .addScene('vader:rattata...', 400)
                        .addScene(theater.replay);



                    vm.players = response.data;
                    vm.players.forEach(function (player) {
                        GameService.findGamesByUser(player._id)
                            .then(function (response) {
                                vm.games = response.data;
                                if (vm.games && vm.games.length > 0) {
                                    var count = 0;
                                    vm.games.forEach(function (game) {
                                        if (game.userWon) {
                                            count++;
                                        }
                                    });
                                    var winPercentage = count / vm.games.length;
                                    vm.scores.push({
                                        "username": player.username,
                                        "winPercentage": winPercentage,
                                        "played": vm.games.length,
                                        "won": count
                                    });
                                }
                            }, function (error) {
                                console.log(error);
                            });
                    });
                }, function (error) {
                    console.log(error);
                });
        }

        init();

        function logout() {
            UserService.logout()
                .then(function (response) {
                    $location.url("/login");
                });
        }
    }
})();