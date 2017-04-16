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
            .when("/", {
                templateUrl: 'views/landing-page/templates/home.view.client.html',
                controller: 'HomeController',
                title: 'Home'
            })
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
                title: 'Pokémon'
            })
            .when("/game", {
                templateUrl: 'views/pokemon/templates/game.view.client.html',
                controller: 'GameController',
                title: 'Game',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/pokedex", {
                templateUrl: 'views/pokedex/templates/pokedex.view.client.html',
                controller: 'PokedexController',
                title: 'Pokédex'
            })
            .when("/pokemon-info/:pokemon", {
                templateUrl: 'views/pokedex/templates/pokemon-info.view.client.html',
                controller: "PokemonInfoController",
                title: 'Pokémon Details'
            })
            .when("/admin", {
                templateUrl: 'views/user/templates/admin.view.client.html',
                controller: 'AdminController',
                resolve: {
                    checkAdmin: checkAdmin
                },
                title: 'Admin'
            })
            .otherwise({
                redirectTo: "/"
            });

    }

    function checkAdmin($q, UserService, $location) {
        var deferred = $q.defer();
        UserService
            .isAdmin()
            .then(function (response) {
                var user = response.data;
                if(user !== '0' && user.roles.indexOf('ADMIN') > -1) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url('/user');
                }
            });
        return deferred.promise;
    }

    function isLoggedIn($q, UserService, $location, $rootScope) {
        var deferred = $q.defer();
        UserService
            .isLoggedIn()
            .then(function (response) {
                    $rootScope.errorMessage = null;
                    var user = response.data;
                    if (user !== '0') {
                        $rootScope.currentUser = user;
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/login");
                    }
                }
            );
        return deferred.promise;
    }

    function setPageTitle($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            $rootScope.title = current.$$route.title;
        });
    }

})();