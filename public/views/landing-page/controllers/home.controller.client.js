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
                                        "played" : vm.games.length,
                                        "won" : count
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

       /* function compare(a, b) {
            if (a.winPercentage < b.winPercentage)
                return -1;
            if (a.winPercentage > b.winPercentage)
                return 1;
            return 0;
        }

        vm.scores.sort(compare);*/

        function logout() {
            UserService.logout
                .then(function (response) {
                    $location.url("/login");
                });
        }
    }
})();