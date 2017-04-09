/**
 * Created by Siddhesh on 4/9/2017.
 */
(function () {
    angular.module("PokemonWorld")
        .controller("RatingController", ratingController);

    function ratingController() {
        var vm = this;
        vm.ratings = [{
            title: 'Rating 1',
            description: 'I\'m not editable but update myself with a timer...',
            rating: 3.5,
            basedOn: 5,
            starsCount: 5,
            iconClass: 'fa fa-mortar-board',
            editableRating: false,
            showGrade: true
        }, {
            title: 'Rating 2',
            description: 'I\'m not editable...',
            rating: 1,
            basedOn: 5,
            starsCount: 5,
            iconClass: 'fa fa-star',
            editableRating: false,
            showGrade: true
        }, {
            title: 'Rating 3',
            description: 'I\'m editable...',
            rating: 2,
            basedOn: 5,
            starsCount: 10,
            iconClass: 'fa fa-star',
            editableRating: true,
            showGrade: true
        }, {
            title: 'Rating 4',
            description: 'I\'m editable with a weird icon...',
            rating: 2.5,
            basedOn: 5,
            starsCount: 5,
            iconClass: 'fa fa-send',
            editableRating: true,
            showGrade: true
        }, {
            title: 'Rating 5',
            description: 'I\'m editable and a lot larger than my neighbours...',
            rating: 33,
            basedOn: 100,
            starsCount: 20,
            iconClass: 'fa fa-star',
            editableRating: true,
            showGrade: true
        }];
    }

})();