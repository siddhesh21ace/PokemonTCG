/**
 * Created by Siddhesh on 4/16/2017.
 */
(function () {
    angular
        .module('PokemonWorld')
        .controller('AdminController', adminController);

    function adminController(UserService) {
        var vm = this;
        vm.user = {};

        vm.createUser = createUser;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;

        function init() {
            findAllUsers();
        }

        init();

        function findAllUsers() {
            UserService
                .findAllUsers()
                .then(renderUsers, errorHandler);
        }

        function createUser(user) {
            UserService
                .createUser(user)
                .then(findAllUsers, errorHandler);
        }

        function updateUser(user) {
            UserService
                .updateUserByAdmin(user)
                .then(findAllUsers, errorHandler);
        }

        function deleteUser(userID) {
            UserService
                .deleteUserByAdmin(userID)
                .then(findAllUsers, errorHandler);
        }
        
        function selectUser(user) {
            UserService.findUserById(user._id)
                .then(function (response) {
                    vm.user = response.data;
                }, errorHandler);
        }

        function renderUsers(response) {
            vm.users = response.data;
        }

        function errorHandler(error) {
            console.log(error);
        }
    }

})();