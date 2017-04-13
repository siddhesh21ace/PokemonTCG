var mongoose = require("mongoose");

var projectUserSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    url: String,
    phone: String,
    google: {
        id: String,
        token: String
    },
    facebook: {
        id: String,
        token: String
    },
    role: {type: String, enum: ['ADMIN', 'PLAYER', 'GYM-LEADER'], default: 'PLAYER'},
    dateCreated: {type: Date, default: Date.now()},
    games: [{type: mongoose.Schema.Types.ObjectId, ref: 'GameModel'}],
    cards: [String]
}, {collection: "project.user"});

// projectUserSchema.index({username:1},{unique:true});

module.exports = projectUserSchema;