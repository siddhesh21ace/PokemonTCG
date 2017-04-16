(function () {
    angular.module("PokemonWorld")
        .controller("GameController", gameController);

    function gameController(CardService, $rootScope, $timeout, $routeParams, GameService, UserService,$route ) {
 //   function gameController(PokemonTCGService, $timeout, $location, $route) {
        var vm = this;

        vm.player1 = {};
        vm.player2 = {};

        vm.player1.cards = [];
        vm.player2.cards = [];
        vm.cards = [];

        vm.game = {};
        vm.game.state = 0;
        vm.game.player1Turn = true;
        vm.game.userCards = [];
        vm.game.botCards = [];
        vm.game.userWon = false;

        vm.gameID = 0;
        vm.user = {};
        vm.attack1 = attack1;
        //vm.attack2 = attack2;
        vm.isNumber = isNumber;

        vm.showActiveCardDetails2 = showActiveCardDetails2;
        vm.showActiveCardDetails1 = showActiveCardDetails1;
        vm.getDamage = getDamage;
        vm.getHp = getHp;
        vm.startGame = startGame;
        vm.startNewGame = startNewGame;

        vm.activeCard={};
        vm.winner={};
        vm.goku = false;

        function isNumber(damage) {
            if (damage === '') {
                return false;
            } else if(isNaN(damage)) {
                return false;
            } else {
                return true;
            }
        }

        function showActiveCardDetails1(card){
            vm.activeCard1 = card;
        }

        function showActiveCardDetails2(card){
            vm.activeCard2 = card;
        }

        function init() {
            UserService.findCurrentUser()
                .then(function (response) {
                    vm.user = response.data;
                });

            CardService.getAllPokemons().then(function (response) {
            $('#myModal').modal({ show: false});
            $('#myModal1').modal({ show: false});
            $('#myModal').modal({
                backdrop: 'static',
                keyboard: false
            })
                vm.cards = response.data;

                var total = vm.cards.length;
                shuffle();

                var i = 0;
                while (i < 5) {
                    vm.player1.cards.push({
                        "isAlive": true,
                        "details": vm.cards[i]
                    });
                    i++;
                    vm.game.userCards.push(vm.cards[i].id);
                }

                while (i < 10) {
                    vm.player2.cards.push({
                        "isAlive": true,
                        "details": vm.cards[i]
                    });
                    i++;
                    vm.game.botCards.push(vm.cards[i].id);
                }

                vm.player1.current = vm.player1.cards[0];
                showActiveCardDetails1(vm.player1.current);
                vm.player2.current = vm.player2.cards[0];
                showActiveCardDetails2(vm.player2.current);

                GameService.createGame(vm.user._id, vm.game)
                    .then(function (response) {
                        vm.gameID = response.data._id;
                    });

                $('#myModal').modal('show');
            }, function (error) {
                vm.error = error.data;
                console.log(error);
            });
        }

        function updateGame() {
            GameService.updateGame(vm.gameID, vm.game)
                .then(function (response) {
                    console.log(response.data);
                })
        }

        init();

        function startGame(){
            console.log('IN Start Game', vm.game.state);
            vm.game.state = 1;
            console.log('After state change', vm.game.state);
            $("#myModal").modal('hide');
        }

        function startNewGame(){
            console.log('IN start New Game');
            $("#myModal1").modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $route.reload();
        }

        function shuffle() {
            var i = 0, j = 0, temp = null;

            for (i = vm.cards.length - 1; i > 0; i -= 1) {
                j = Math.floor(Math.random() * (i + 1))
                temp = vm.cards[i]
                vm.cards[i] = vm.cards[j]
                vm.cards[j] = temp
            }
        }
        
        function giftCard() {
            var card = {
                "tcgID" : vm.cards[50].id
            }
            console.log(vm.cards[50]);
            vm.url = vm.cards[50].imageUrlHiRes;

            CardService.addCard(vm.user._id, card)
                .then(function (response) {
                    console.log(response.data);
                })
        }

        function attack1(damage) {
            var hp = vm.player2.current.details.hp;
            vm.player2.current.details.hp = vm.player2.current.details.hp - damage;

            if (vm.player2.current.details.hp <= 0) {
                vm.player2.current.isAlive = false;
                vm.player2.current = getNext(vm.player2.cards, vm.player2.current);
                showActiveCardDetails2(vm.player2.current);
                if(!vm.player2.current) {
                    console.log("Game Over - Player 1 won");
                    vm.winner = 1;
                    vm.game.userWon = true;
                    updateGame();
                    giftCard();
                    vm.game.state =2;
                    $('#myModal1').modal('show');
                }
            } else {
                vm.game.player1Turn = false;
                //$timeout(vm.attack2(getDamage(vm.activeCard2.details.attacks)), 5000);

                vm.goku = true;
                vm.computerMessage= "Computer Deciding an Attack !!";
                var attack = getDamage(vm.activeCard2.details.attacks);
                vm.getMaxAttackDamage = attack.damage;
                vm.selectedAttack = attack.name;

                $timeout(
                    function attack2() {
                        var hp = vm.player1.current.details.hp;
                        vm.computerMessage="Attack "+vm.selectedAttack+" Selected";
                        vm.player1.current.details.hp = vm.player1.current.details.hp - vm.getMaxAttackDamage;

                        if (vm.player1.current.details.hp <= 0) {
                            vm.player1.current.isAlive = false;
                            vm.player1.current =  getNext(vm.player1.cards, vm.player1.current);
                            showActiveCardDetails1(vm.player1.current);
                            if(!vm.player1.current) {
                                console.log("Game Over - Player 2 won");
                                vm.winner = 2;
                                updateGame();
                                vm.game.state =2;
                                $('#myModal1').modal('show');
                            }

                            var attack = getDamage(vm.activeCard2.details.attacks);
                            vm.getMaxAttackDamage = attack.damage;
                            vm.selectedAttack = attack.name;
                            $timeout(attack2(), 3000);
                        } else {
                            $timeout(function(){
                                vm.goku = false;
                                vm.game.player1Turn = true;
                            }, 1000);
                        }
                }, 3000);
            }
        }

        // function attack2(damage) {
        //     var hp = vm.player1.current.details.hp;
        //     vm.player1.current.details.hp = vm.player1.current.details.hp - damage;
        //
        //     if (vm.player1.current.details.hp <= 0) {
        //         vm.player1.current.isAlive = false;
        //         vm.player1.current =  getNext(vm.player1.cards, vm.player1.current);
        //         showActiveCardDetails1(vm.player1.current);
        //         if(!vm.player1.current) {
        //             console.log("Game Over - Player 2 won");
        //             vm.winner = 2;
        //         }
        //         $timeout(attack2(getDamage(vm.activeCard2.details.attacks)), 2000);
        //     } else {
        //         vm.game.player1Turn = true;
        //     }
        // }


        function getDamage(activePlayerAttacks){
            var pickMaxAttack = activePlayerAttacks[0];

            for(a in activePlayerAttacks){
                if(activePlayerAttacks[a].damage > pickMaxAttack.damage)
                    pickMaxAttack = activePlayerAttacks[a];

            }

            return pickMaxAttack;
        }

        function getNext(playerCards, currentCard) {
            var nextIndex = playerCards.indexOf(currentCard) + 1;
            if (nextIndex >= playerCards.length) {
                return null;
            }
            return playerCards[nextIndex];
        }

        function getHp(stat){
           return (stat/200) * 100;
        }

    }
})();