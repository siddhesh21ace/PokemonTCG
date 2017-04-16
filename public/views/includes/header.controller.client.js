(function(){
    angular.module("PokemonWorld")
        .controller("HeaderController", HeaderController);

    function HeaderController($routeParams, $location, UserService){
        console.log("inside index controller.")
        var vm = this;

        vm.user = {};
        vm.logout = logout;
        vm.isAdmin = isAdmin;

        function isAdmin() {
            return (vm.user.roles && vm.user.roles.indexOf('ADMIN') > -1);
        }

        function init() {
            UserService.findCurrentUser()
                .then(function (response) {
                    vm.user = response.data;
                });
        }

        init();

        function logout() {
            console.log("In logout");
            UserService.logout()
                .then(function (response) {
                    console.log("In logout" + response);
                    $location.url("/login");
                });
        }


    }
})();