(function () {
    angular
        .module("PokemonWorld")
        .controller("ProfileController", profileController);

    function profileController($routeParams, UserService, $location, CardService, LikeService, PokemonService, Upload, $timeout) {
        var vm = this;
        vm.user = {};

        vm.update = update;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        vm.selectFile = selectFile;
        vm.uploadFile = uploadFile;
        vm.file = {};

        vm.collectedCards = [];
        vm.likedPokemons = [];

        function init() {
            UserService.findCurrentUser()
                .then(function (response) {
                    vm.user = response.data;
                    return CardService.findCardsByUser(vm.user._id);
                })
                .then(function (response) {
                    var cardIDs = response.data;
                    cardIDs.forEach(function (obj) {
                        CardService.findCardByTCGID(obj.tcgID)
                            .then(function (response) {
                                vm.collectedCards.push(response.data.card);
                            })
                    });
                    $("#profile").fadeOut("slow");
                    $("#loading").delay(200).fadeOut("slow").remove();
                    return LikeService.findLikedPokemonsByUser(vm.user._id);

                })
                .then(function (response) {
                    var likeMapping = response.data;
                    likeMapping.forEach(function (obj) {
                        PokemonService.findPokemonById(obj.pokemon_id)
                            .then(function (response) {
                                var poke = response.data;
                                return PokemonService.findPokemonByPokeId(poke.pokedex_number);
                                $("#profile").fadeOut("slow");
                                $("#loading").delay(200).fadeOut("slow").remove();
                            })
                            .then(function (response) {
                                var pokemon = response.data;
                                pokemon.img_id = padToThree(pokemon.id);
                                vm.likedPokemons.push(pokemon);
                                $("#profile").fadeOut("slow");
                                $("#loading").delay(200).fadeOut("slow").remove();
                            });
                    });
                })

            $("#myModal1").modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();

        }

        init();

        function padToThree(number) {
            if (number <= 999) {
                number = ("00" + number).slice(-3);
            }
            return number;
        }

        function logout() {
            UserService.logout()
                .then(function (response) {
                    $location.url("/login");
                });
        }

        function update(updatedUser) {
            var file = {};

            if(vm.imageFile) {
                file.upload = Upload.upload({
                    url: '/api/user/upload',
                    data: {'file': vm.imageFile}
                });

                file.upload.then(function (response) {
                    updatedUser.url = "/uploads/" + response.data.filename;
                    vm.imageFile.result = response.data;

                    UserService.updateUser(vm.user._id, updatedUser)
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

                }, function (response) {
                    if (response.status > 0)
                        vm.error = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    vm.imageFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            } else {
                UserService.updateUser(vm.user._id, updatedUser)
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
        }

        function deleteUser() {
            var answer = confirm("Are you sure?");
            if (answer) {
                UserService.deleteUser(vm.user._id)
                    .then(function (response) {
                        $location.url("/login");
                    }, function (error) {
                        vm.error = 'Unable to delete user';
                    });
            }
        }

        function selectFile(files) {
            //vm.user.image = vm.user;
            vm.file = files[0];
        }

        function uploadFile() {
            UserService.uploadImage(vm.file)
                .then(
                    function (image) {
                        vm.message = "Image " + image.data.originalname + " was uploaded successfully";
                        vm.user.image = "/uploads/" + image.data.filename;
                        vm.user.url = "/uploads/" + image.data.filename;
                    },
                    function (err) {
                        vm.error = "Unable to upload file ";
                    });
        }
    }
})();
