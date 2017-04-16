module.exports = function () {
    var mongoose = require("mongoose");
    var projectUserSchema = require('./user.schema.server');
    var UserModel = mongoose.model('UserModel', projectUserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserbyUsername: findUserbyUsername,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId,
        getAllUsers: getAllUsers,
        getAllPlayers: getAllPlayers
    };

    return api;

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function createUser(user) {
        if(!user.roles) {
            user.roles = ["PLAYER"];
        }
        delete user._id;
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserbyUsername(username) {
        return UserModel.findOne({"username": username});
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({"username": username, "password": password});
    }

    function deleteUser(userId) {
        return UserModel.remove({"_id": userId});
    }

    function updateUser(userId, updatedUser) {
        delete updatedUser._id;
        return UserModel.update({"_id": userId}, {$set: updatedUser});
    }

    function getAllUsers() {
        return UserModel.find();
    }

    function getAllPlayers() {
        return UserModel.find({"roles": {$all: ["PLAYER"]}});
    }

};