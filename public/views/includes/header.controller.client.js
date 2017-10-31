/**
 * Created by Siddhesh on 4/25/2017.
 */
(function () {
    angular.module("PokemonWorld")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {
        var vm = this;
        vm.isAdmin = isAdmin;
        vm.logout = logout;
        vm.location = $location;

        function init() {
            UserService.findCurrentUser()
                .then(function (response) {
                    vm.user = response.data;
                }, function (error) {
                    console.log(error);
                });
        }

        init();

        function isAdmin() {
            return (vm.user && vm.user.roles && vm.user.roles.indexOf('ADMIN') > -1);
        }

        function logout() {
            UserService.logout()
                .then(function (response) {
                    $location.url("/login");
                }, function (error) {
                    console.log(error);
                });
        }
    }
})();