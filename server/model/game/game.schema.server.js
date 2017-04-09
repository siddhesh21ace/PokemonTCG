/**
 * Created by Siddhesh on 4/8/2017.
 */
var mongoose = require("mongoose");

var projectGameSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    userCards: [String],
    botCards: [String],
    userWon: false,
    dateCreated: {type: Date, default: Date.now()}
});