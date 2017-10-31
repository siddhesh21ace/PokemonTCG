(function () {

    $(window).on('load', function () {
        $("#status").fadeOut("slow");
        $("#preloader").delay(500).fadeOut("slow").remove();
    });

    //apply scrollspy on menu item
    $("body").scrollspy({
        target: '.navbar-custom',
        offset: 80
    });

})();