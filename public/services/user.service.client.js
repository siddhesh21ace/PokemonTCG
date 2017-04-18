(function () {
    angular
        .module("PokemonWorld")
        .factory('UserService', userService);

    function userService($http) {
        var api = {
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "login": login,
            "isLoggedIn": isLoggedIn,
            "logout": logout,
            "findCurrentUser": findCurrentUser,
            "register": register,
            "uploadImage": uploadImage,
            "isAdmin": isAdmin,
            "findAllUsers": findAllUsers,
            "updateUserByAdmin": updateUserByAdmin,
            "deleteUserByAdmin": deleteUserByAdmin,
            "getAllPlayers": getAllPlayers
        };
        return api;

        function register(user) {
            return $http.post("/api/register", user);
        }

        function findCurrentUser() {
            return $http.get("/api/user");
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function isLoggedIn() {
            return $http.post("/api/isLoggedIn");
        }

        function deleteUser(userId) {
            return $http.delete('/api/user/' + userId);
        }

        function createUser(user) {
            return $http.post("/api/admin/user", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password);
        }

        function updateUser(userId, updatedUser) {
            return $http.put("/api/user/" + userId, updatedUser);
        }

        function findUserById(userID) {
            return $http.get("/api/user/" + userID);
        }

        function uploadImage(file) {
            var fd = new FormData();
            fd.append("file", file)
            console.log(fd, file);
            return $http.post('/api/user/upload', fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            });
        }

        function isAdmin() {
            return $http.post("/api/isAdmin");
        }

        function updateUserByAdmin(user) {
            return $http.put("/api/admin/user/" + user._id, user);
        }

        function deleteUserByAdmin(userID) {
            return $http.delete('/api/admin/user/' + userID);
        }

        function findAllUsers() {
            return $http.get('/api/admin/user');
        }

        function getAllPlayers() {
            return $http.get('/api/player');
        }
    }
})();
