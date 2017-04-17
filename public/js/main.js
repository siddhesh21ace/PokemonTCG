
// function main() {

(function () {
   'use strict';

	// Hide .navbar first
	$(".navbar").hide();
	
	// Fade in .navbar
	$(function () {
		$(window).scroll(function () {
            // set distance user needs to scroll before we fadeIn navbar
			if ($(this).scrollTop() > 200) {
				$('.navbar').fadeIn();
			} else {
				$('.navbar').fadeOut();
			}
		});

	
	});
	
	// Preloader */
	  	$(window).load(function() {

   	// will first fade out the loading animation 
    	$("#status").fadeOut("slow"); 

    	// will fade out the whole DIV that covers the website. 
    	$("#preloader").delay(500).fadeOut("slow").remove();      

  	}) 

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

    $('body').scrollspy({ 
        target: '.navbar-default',
        offset: 80
    })

  	// $(document).ready(function() {
  	//     $("#testimonial").owlCarousel({
       //  navigation : false, // Show next and prev buttons
       //  slideSpeed : 300,
       //  paginationSpeed : 400,
       //  singleItem:true
       //  });
      //
  	// });

  	// Portfolio Isotope Filter
    $(window).load(function() {
        var $container = $('.portfolio-items');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.cat a').click(function() {
            $('.cat .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

    });
	
	

  // jQuery Parallax
  function initParallax() {
    $('#intro').parallax("100%", 0.3);
      $('#about').parallax("100%", 0.3);
    $('#pokemon').parallax("100%", 0.3);
    $('#pokedex').parallax("100%", 0.3);
    $('#gym').parallax("100%", 0.1);
      $('#leaderboard').parallax("100%", 0.1);

  }
  initParallax();

  	// Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});

    var theater = theaterJS();
    theater
        .on('type:start, erase:start', function () {
            // add a class to actor's dom element when he starts typing/erasing
            var actor = theater.getCurrentActor()
            actor.$element.classList.add('is-typing')
        })
        .on('type:end, erase:end', function () {
            // and then remove it when he's done
            var actor = theater.getCurrentActor()
            actor.$element.classList.remove('is-typing')
        })


    theater
        .addActor('vader', 0.8)

    theater
        .addScene('vader:Pikachu...', 400)
        .addScene('vader:Bulbasaur...', 400)
        .addScene('vader:Venusaur...', 400)
        .addScene('vader:Ivysaur...', 400)
        .addScene('vader:Charmeleon...', 400)
        .addScene('vader:Blastoise...', 400)
        .addScene('vader:Kakuna...', 400)
        .addScene('vader:caterpie...', 400)
        .addScene('vader:Pikachu...', 400)
        .addScene('vader:wartortle...', 400)
        .addScene('vader:beedrill...', 400)
        .addScene('vader:rattata...', 400)
        .addScene(theater.replay);

}());


// }
// main();