(function () {
    angular.module("PokemonWorld")
        .controller("HomeController", HomeController);

    function HomeController(UserService, GameService) {
        var vm = this;
        vm.scores = [];

        /* Logic to get LeaderBoard */
        function init() {
            UserService.getAllPlayers()
                .then(function (response) {
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
    }
})();