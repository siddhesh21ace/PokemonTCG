/**
 * Created by Siddhesh on 4/4/2017.
 */
(function () {
    angular
        .module("PokemonWorld")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'LoginController'
            })
            .when("/register", {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController'
            })
            .when("/user", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: "ProfileController"
            })
            .when("/user/:uid", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController'
            })
            .when("/pokemon", {
                templateUrl: 'views/pokemon/templates/card.view.client.html',
                controller: 'PokemonController'
            })
            .when("/", {
                redirectTo: "/login"
            })
            .otherwise({
                redirectTo: "/"
            });
    }
})();