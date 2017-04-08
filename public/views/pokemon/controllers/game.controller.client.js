/**
 * Created by Siddhesh on 4/7/2017.
 */
(function () {
    angular.module("PokemonWorld")
        .controller("GameController", gameController);

    function gameController(PokemonTCGService) {
        var vm = this;
        vm.player1 = {};
        vm.player2 = {};

        vm.player1.cards = [];
        vm.player2.cards = [];
        vm.cards = [];

        vm.game = {};
        vm.game.player1Turn = true;
        vm.attack1 = attack1;
        vm.attack2 = attack2;
        vm.isNumber = isNumber;

        function isNumber(damage) {
            if (damage === '') {
                return false;
            } else if(isNaN(damage)) {
                return false;
            } else {
                return true;
            }
        }

        function init() {
            PokemonTCGService.getAllPokemons().then(function (response) {
                vm.cards = response.data;

                var total = vm.cards.length;
                shuffle();

                var i = 0;
                while (i < 3) {
                    vm.player1.cards.push({
                        "isAlive": true,
                        "details": vm.cards[i]
                    });
                    i++;
                }

                while (i < 6) {
                    vm.player2.cards.push({
                        "isAlive": true,
                        "details": vm.cards[i]
                    });
                    i++;
                }
                vm.player1.current = vm.player1.cards[0];
                vm.player2.current = vm.player2.cards[0];
            }, function (error) {
                vm.error = error.data;
                console.log(error);
            });
        }

        init();

        function shuffle() {
            var i = 0, j = 0, temp = null;

            for (i = vm.cards.length - 1; i > 0; i -= 1) {
                j = Math.floor(Math.random() * (i + 1))
                temp = vm.cards[i]
                vm.cards[i] = vm.cards[j]
                vm.cards[j] = temp
            }
        }

        function attack1(damage) {
            var hp = vm.player2.current.details.hp;
            vm.player2.current.details.hp = vm.player2.current.details.hp - damage;

            if (vm.player2.current.details.hp <= 0) {
                vm.player2.current.isAlive = false;
                vm.player2.current = getNext(vm.player2.cards, vm.player2.current);
                if(!vm.player2.current) {
                    console.log("Game Over - Player 1 won");
                }
            } else {
                vm.game.player1Turn = false;
            }
        }

        function attack2(damage) {
            var hp = vm.player1.current.details.hp;
            vm.player1.current.details.hp = vm.player1.current.details.hp - damage;

            if (vm.player1.current.details.hp <= 0) {
                vm.player1.current.isAlive = false;
                vm.player1.current =  getNext(vm.player1.cards, vm.player1.current);
                if(!vm.player1.current) {
                    console.log("Game Over - Player 2 won");
                }
            } else {
                vm.game.player1Turn = true;
            }
        }

        function getNext(playerCards, currentCard) {
            var nextIndex = playerCards.indexOf(currentCard) + 1;
            if (nextIndex >= playerCards.length) {
                return null;
            }
            return playerCards[nextIndex];
        }

        /*startGame();

        function startGame() {
            while (vm.game.isNotOver) {
                if (vm.game.playerTurn) {
                    // player's turn
                } else {
                    //comp's turn
                }
                vm.game.playerTurn = !vm.game.playerTurn;
            }
        }*/

    }
})();