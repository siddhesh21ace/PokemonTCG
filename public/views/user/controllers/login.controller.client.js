(function () {
    angular
        .module("PokemonWorld")
        .controller("LoginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function init() {
            UserService.findCurrentUser()
                .then(function (response) {
                    vm.user = response.data;
                });

        }

        init();


        function login(user) {
            if (user) {
                UserService.login(user)
                    .then(function (response) {
                        var loggedInUser = response.data;
                        if (loggedInUser) {
                            $location.url('/user/' + loggedInUser._id);
                        } else {
                            vm.error = 'User not found';
                        }
                    }, function (err) {
                        vm.error = err.data;
                        console.log(err);
                    });
            } else {
                vm.error = 'Please enter correct credentials';
            }
        }
    }
})();