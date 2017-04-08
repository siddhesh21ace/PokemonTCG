(function () {
    angular
        .module("PokemonWorld")
        .controller("LoginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

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