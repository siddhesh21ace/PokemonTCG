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
                controllerAs: 'model',
                title: 'Home'
            })
            .when("/login", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model',
                title: 'Login'
            })
            .when("/register", {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model',
                title: 'Register'
            })
            .when("/user", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: "ProfileController",
                controllerAs: 'model',
                title: 'Profile',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                title: 'Profile',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/game", {
                templateUrl: 'views/pokemon/templates/game.view.client.html',
                controller: 'GameController',
                controllerAs: 'model',
                title: 'Game',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/pokedex", {
                templateUrl: 'views/pokedex/templates/pokedex.view.client.html',
                controller: 'PokedexController',
                controllerAs: 'model',
                title: 'Pokédex'
            })
            .when("/pokemon-info/:pokemon", {
                templateUrl: 'views/pokedex/templates/pokemon-info.view.client.html',
                controller: "PokemonInfoController",
                controllerAs: 'model',
                title: 'Pokémon Details'
            })
            .when("/admin", {
                templateUrl: 'views/user/templates/admin.view.client.html',
                controller: 'AdminController',
                controllerAs: 'model',
                resolve: {
                    checkAdmin: checkAdmin
                },
                title: 'Admin'
            })
            .otherwise({
                redirectTo: "/"
            });

    }

    /*Check if logged in user is admin or not*/

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

    /*Check if user is logged in or not*/
    function isLoggedIn($q, UserService, $location, $rootScope) {
        var deferred = $q.defer();
        UserService
            .isLoggedIn()
            .then(function (response) {
                    $rootScope.errorMessage = null;
                    var user = response.data;
                    if (user !== '0') {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/login");
                    }
                }
            );
        return deferred.promise;
    }

    /*Set Page Title*/
    function setPageTitle($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            $rootScope.title = current.$$route.title;
        });
    }

})();