(function(){
    angular.module("PokemonWorld")
        .controller("HomeController", HomeController);

    function HomeController($routeParams, $location, UserService){
        console.log("inside home controller.")
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.logout = logout;

        console.log(vm.userID, vm.user);
        function init() {
            UserService.findCurrentUser()
                .then(function (response) {
                    vm.user = response.data;
                });
        }

        init();

        function logout() {
            console.log("In logout");
            UserService.logout
                .then(function (response) {
                    console.log("In logout" + response);
                    $location.url("/login");
                });
        }
    }
})();