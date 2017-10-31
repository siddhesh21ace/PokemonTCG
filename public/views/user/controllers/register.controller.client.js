(function () {
    angular
        .module("PokemonWorld")
        .controller("RegisterController", registerController);

    function registerController(UserService, $location, $timeout, Upload) {
        var vm = this;
        vm.user = {};

        vm.register = register;
        vm.selectFile = selectFile;
        vm.uploadFile = uploadFile;

        function register() {
            var file = {};
            if (vm.user) {
                file.upload = Upload.upload({
                    url: '/api/user/upload',
                    data: {'file': vm.imageFile}
                });

                file.upload.then(function (response) {
                    vm.user.url = "/uploads/" + response.data.filename;
                    vm.imageFile.result = response.data;

                    UserService.register(vm.user)
                        .then(function (response) {
                            var user = response.data;
                            $timeout(function () {
                                $location.url("/user/" + user._id);
                            });
                        }, function (error) {
                            vm.error = error.data;
                        });
                }, function (response) {
                    if (response.status > 0)
                        vm.error = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    vm.imageFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            } else {
                vm.error = 'Please enter all the details';
            }
        }

        function selectFile(files) {
            vm.file = files[0];
        }

        function uploadFile() {
            UserService.uploadImage(vm.file)
                .then(function (image) {
                    vm.message = "Image " + image.data.originalname + " was uploaded successfully";
                    vm.user.image = "/uploads/" + image.data.filename;
                    vm.user.url = "/uploads/" + image.data.filename;
                }, function (error) {
                    vm.error = "Unable to upload file " + error;
                });
        }
    }
})();