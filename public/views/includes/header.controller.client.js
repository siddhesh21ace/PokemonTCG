(function () {
    angular.module("PokemonWorld")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {
        var vm = this;

        vm.user = {};
        vm.logout = logout;
        vm.isAdmin = isAdmin;

        function isAdmin() {
            return (vm.user && vm.user.roles && vm.user.roles.indexOf('ADMIN') > -1);
        }

        function init() {
            UserService.findCurrentUser()
                .then(function (response) {
                    vm.user = response.data;
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