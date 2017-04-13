(function () {
    angular
        .module("PokemonWorld")
        .controller("RegisterController", registerController);

    function registerController(UserService, $location) {
        var vm = this;
        vm.user={};
        vm.register = register;
        vm.selectFile = selectFile;
        vm.uploadFile = uploadFile;

        function register(user) {
            if (user) {
                UserService.register(user)
                    .then(function (response) {
                            var user = response.data;
                            $location.url("/user/" + user._id);
                        },
                        function (error) {
                            vm.error = error.data;
                        });
            } else {
                vm.error = 'Please enter all the details';
            }
        }


        function selectFile(files){
            //vm.user.image = vm.user;
            vm.file = files[0];
        };


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