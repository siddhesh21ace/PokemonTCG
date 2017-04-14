/**
 * Created by Siddhesh on 4/9/2017.
 */
var mongoose = require("mongoose");

var projectCardSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    tcgID: String,
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "project.card"});

module.exports = projectCardSchema;