(function () {
    angular.module("PokemonWorld")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {
        var vm = this;

        vm.user = {};
        vm.logout = logout;
        vm.isAdmin = isAdmin;

        /*Setup Header animations*/
        // Page scroll
        $('a.page-scroll').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 40
                    }, 900);
                    return false;
                }
            }
        });

        // Show Menu on Book
        $(window).bind('scroll', function() {
            var navHeight = $(window).height() - 100;

            if ($(window).scrollTop() > navHeight) {
                $('.navbar-default').addClass('on');
            } else {
                $('.navbar-default').removeClass('on');
            }
        });

        //apply scrollspy on menu item
        $("#page-top").scrollspy({
            target: '.navbar-default',
            offset: 80
        })

        //close navbar on mobile layout
        $('.navbar-nav a').on('click', function () {
            if (window.innerWidth <= 768) {
                $(".navbar-toggle").click();
            }
        });

        /*Header animation ends*/



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