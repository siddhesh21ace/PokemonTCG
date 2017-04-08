/**
 * Created by Siddhesh on 4/4/2017.
 */
(function () {
    angular
        .module("PokemonWorld")
        .config(configuration)
        .run(setPageTitle);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'LoginController',
                title: 'Login'
            })
            .when("/register", {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                title: 'Register'
            })
            .when("/user", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: "ProfileController",
                title: 'Profile',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                title: 'Profile',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/pokemon", {
                templateUrl: 'views/pokemon/templates/card.view.client.html',
                controller: 'PokemonController',
                title: 'Pokemon'
            })
            .when("/game", {
                templateUrl: 'views/pokemon/templates/game.view.client.html',
                controller: 'GameController',
                title: 'Game'
            })
            .when("/", {
                redirectTo: "/login"
            })
            .otherwise({
                redirectTo: "/"
            });

        function isLoggedIn($q, UserService, $location) {
            var deferred = $q.defer();
            UserService
                .isLoggedIn()
                .then(function (response) {
                        var user = response.data;
                        if (user != '0') {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );
            return deferred.promise;
        }
    }

    function setPageTitle($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            $rootScope.title = current.$$route.title;
        });
    }

})();