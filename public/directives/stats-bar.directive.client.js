/**
 * Created by Siddhesh on 4/24/2017.
 */
(function () {
    angular
        .module('PokemonWorld')
        .directive('statsBar', statsBarDir);

    function statsBarDir() {
        function linkFunc(scope, element) {
            $(document).ready(function () {
                var currentRating = element.data('current-rating');
                element.barrating('show', {
                    theme: 'bars-horizontal',
                    readonly: true,
                    initialRating: currentRating,
                    reverse: true,
                    showSelectedRating: true
                });
            });
        }

        return {
            link: linkFunc
        };
    }
})();
