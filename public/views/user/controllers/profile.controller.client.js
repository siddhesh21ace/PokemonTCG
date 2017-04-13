(function () {
    angular
        .module("PokemonWorld")
        .controller("ProfileController", profileController);

    function profileController($routeParams, UserService, $location) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.user={};
        vm.update = update;
        vm.deleteUser = deleteUser;
        vm.showPokedex = showPokedex;
        vm.logout = logout;
        vm.selectFile = selectFile;
        vm.uploadFile = uploadFile;
        vm.file = {};

        var likedPokemons = [
            {id: "001", image: "http://assets.pokemon.com//assets/cms2/img/pokedex/detail/001.png", name: "bulbasaur"},
            {id: "002", image: "http://assets.pokemon.com//assets/cms2/img/pokedex/detail/002.png", name: "ivysaur"},
            {id: "003", image: "http://assets.pokemon.com//assets/cms2/img/pokedex/detail/003.png", name: "venusaur"},
            {id: "004", image: "http://assets.pokemon.com//assets/cms2/img/pokedex/detail/004.png", name: "charmander"},
            {id: "005", image: "http://assets.pokemon.com//assets/cms2/img/pokedex/detail/005.png", name: "charmeleon"},
            {id: "006", image: "http://assets.pokemon.com//assets/cms2/img/pokedex/detail/006.png", name: "charizad"},
            {id: "007", image: "http://assets.pokemon.com//assets/cms2/img/pokedex/detail/007.png", name: "squirtle"}];

        vm.likedPokemons = likedPokemons;

        var collectedCards =[
            { id: 'base1-30',
                name: 'Ivysaur',
                nationalPokedexNumber: 2,
                imageUrl: 'https://images.pokemontcg.io/base1/30.png',
                imageUrlHiRes: 'https://images.pokemontcg.io/base1/30_hires.png',
                subtype: 'Stage 1',
                supertype: 'Pokémon',
                evolvesFrom: 'Barboach',
                hp: '60',
                retreatCost: [ 'Colorless' ],
                number: '30',
                artist: 'Ken Sugimori',
                rarity: 'Uncommon',
                series: 'Base',
                set: 'Base',
                setCode: 'base1',
                types: [ 'Grass' ],
                attacks: [ [Object], [Object] ],
                weaknesses: [ [Object] ] },
            { id: 'base1-31',
                name: 'Jynx',
                nationalPokedexNumber: 124,
                imageUrl: 'https://images.pokemontcg.io/base1/31.png',
                imageUrlHiRes: 'https://images.pokemontcg.io/base1/31_hires.png',
                subtype: 'Basic',
                supertype: 'Pokémon',
                hp: '70',
                retreatCost: [ 'Colorless', 'Colorless' ],
                number: '31',
                artist: 'Ken Sugimori',
                rarity: 'Uncommon',
                series: 'Base',
                set: 'Base',
                setCode: 'base1',
                types: [ 'Psychic' ],
                attacks: [ [Object], [Object] ],
                weaknesses: [ [Object] ] },
            { id: 'base1-32',
                name: 'Kadabra',
                nationalPokedexNumber: 64,
                imageUrl: 'https://images.pokemontcg.io/base1/32.png',
                imageUrlHiRes: 'https://images.pokemontcg.io/base1/32_hires.png',
                subtype: 'Stage 1',
                supertype: 'Pokémon',
                evolvesFrom: 'Abra',
                hp: '60',
                retreatCost: [ 'Colorless', 'Colorless', 'Colorless' ],
                number: '32',
                artist: 'Ken Sugimori',
                rarity: 'Uncommon',
                series: 'Base',
                set: 'Base',
                setCode: 'base1',
                types: [ 'Psychic' ],
                attacks: [ [Object], [Object] ],
                weaknesses: [ [Object] ] },
            { id: 'base1-34',
                name: 'Machoke',
                nationalPokedexNumber: 67,
                imageUrl: 'https://images.pokemontcg.io/base1/34.png',
                imageUrlHiRes: 'https://images.pokemontcg.io/base1/34_hires.png',
                subtype: 'Stage 1',
                supertype: 'Pokémon',
                evolvesFrom: 'Machop',
                hp: '80',
                retreatCost: [ 'Colorless', 'Colorless', 'Colorless' ],
                number: '34',
                artist: 'Ken Sugimori',
                rarity: 'Uncommon',
                series: 'Base',
                set: 'Base',
                setCode: 'base1',
                types: [ 'Fighting' ],
                attacks: [ [Object], [Object] ],
                weaknesses: [ [Object] ] },
            { id: 'base1-38',
                name: 'Poliwhirl',
                nationalPokedexNumber: 61,
                imageUrl: 'https://images.pokemontcg.io/base1/38.png',
                imageUrlHiRes: 'https://images.pokemontcg.io/base1/38_hires.png',
                subtype: 'Stage 1',
                supertype: 'Pokémon',
                evolvesFrom: 'Poliwag',
                hp: '60',
                retreatCost: [ 'Colorless' ],
                number: '38',
                artist: 'Ken Sugimori',
                rarity: 'Uncommon',
                series: 'Base',
                set: 'Base',
                setCode: 'base1',
                types: [ 'Water' ],
                attacks: [ [Object], [Object] ],
                weaknesses: [ [Object] ] },
            { id: 'base1-39',
                name: 'Porygon',
                nationalPokedexNumber: 137,
                imageUrl: 'https://images.pokemontcg.io/base1/39.png',
                imageUrlHiRes: 'https://images.pokemontcg.io/base1/39_hires.png',
                subtype: 'Basic',
                supertype: 'Pokémon',
                hp: '30',
                retreatCost: [ 'Colorless' ],
                number: '39',
                artist: 'Tomoaki Imakuni',
                rarity: 'Uncommon',
                series: 'Base',
                set: 'Base',
                setCode: 'base1',
                types: [ 'Colorless' ],
                attacks: [ [Object], [Object] ],
                weaknesses: [ [Object] ],
                resistances: [ [Object] ] },
            { id: 'base1-41',
                name: 'Seel',
                nationalPokedexNumber: 86,
                imageUrl: 'https://images.pokemontcg.io/base1/41.png',
                imageUrlHiRes: 'https://images.pokemontcg.io/base1/41_hires.png',
                subtype: 'Basic',
                supertype: 'Pokémon',
                hp: '60',
                retreatCost: [ 'Colorless' ],
                number: '41',
                artist: 'Ken Sugimori',
                rarity: 'Uncommon',
                series: 'Base',
                set: 'Base',
                setCode: 'base1',
                types: [ 'Water' ],
                attacks: [ [Object] ],
                weaknesses: [ [Object] ] },
            { id: 'base1-43',
                name: 'Abra',
                nationalPokedexNumber: 63,
                imageUrl: 'https://images.pokemontcg.io/base1/43.png',
                imageUrlHiRes: 'https://images.pokemontcg.io/base1/43_hires.png',
                subtype: 'Basic',
                supertype: 'Pokémon',
                hp: '30',
                number: '43',
                artist: 'Mitsuhiro Arita',
                rarity: 'Common',
                series: 'Base',
                set: 'Base',
                setCode: 'base1',
                types: [ 'Psychic' ],
                attacks: [ [Object] ],
                weaknesses: [ [Object] ] },
            { id: 'base1-44',
                name: 'Bulbasaur',
                nationalPokedexNumber: 1,
                imageUrl: 'https://images.pokemontcg.io/base1/44.png',
                imageUrlHiRes: 'https://images.pokemontcg.io/base1/44_hires.png',
                subtype: 'Basic',
                supertype: 'Pokémon',
                hp: '40',
                retreatCost: [ 'Colorless' ],
                number: '44',
                artist: 'Mitsuhiro Arita',
                rarity: 'Common',
                series: 'Base',
                set: 'Base',
                setCode: 'base1',
                types: [ 'Grass' ],
                attacks: [ [Object] ],
                weaknesses: [ [Object] ] },
        ];

        vm.collectedCards =collectedCards;

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

        function update(updatedUser) {
            UserService.updateUser(vm.userID, updatedUser)
                .then(function (response) {
                    var user = response.data;
                    if (user === null) {
                        vm.error = "Unable to update user";
                    } else {
                        vm.message = "User successfully updated";
                    }
                }, function (error) {
                    vm.error = "Unable to update user";
                });
        }

        function deleteUser() {
            var answer = confirm("Are you sure?");
            if (answer) {
                UserService.deleteUser(vm.userID)
                    .then(function (response) {
                        $location.url("/login");
                    }, function (error) {
                        vm.error = 'Unable to delete user';
                    });
            }
        }

        function selectFile(files){
            //vm.user.image = vm.user;
            vm.file = files[0];
        };

        function showPokedex(user){
            console.log('In Pokedex');
            $location.url("/pokedex");
        }

        function uploadFile(){
            UserService.uploadImage(vm.file)
                .then(
                    function(image){
                    vm.message = "Image "+ image.data.originalname +" was uploaded successfully";
                    vm.user.image = "/uploads/"+image.data.filename;
                    vm.user.url = "/uploads/"+image.data.filename;
                },
                function(err){
                    vm.error = "Unable to upload file ";
                });
        };
    }
})();
