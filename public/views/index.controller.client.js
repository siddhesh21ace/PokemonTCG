/**
 * Created by Siddhesh on 4/22/2017.
 */
(function () {
    angular.module("PokemonWorld")
        .controller("IndexController", indexController);

    function indexController(UserService, $location) {
        var vm = this;

        function init() {
            vm.isLocal = $location.$$absUrl.indexOf('localhost') > -1;
        }

        init();
    }
})();