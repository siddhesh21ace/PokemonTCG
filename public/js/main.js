
function main() {

        // Preloader */
        $(window).load(function() {
        // will first fade out the loading animation
        $("#status").fadeOut("slow");
        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(500).fadeOut("slow").remove();

        })

        // Initialize jQuery Parallax
        function initParallax() {
        $('#intro').parallax("100%", 0.3);
        $('#about').parallax("100%", 0.3);
        $('#pokemon').parallax("100%", 0.3);
        $('#pokedex').parallax("100%", 0.3);
        $('#gym').parallax("100%", 0.3);
        $('#leaderboard').parallax("100%", 0.3);
        }
        initParallax();

}
main();