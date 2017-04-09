/**
 * Created by Siddhesh on 4/5/2017.
 */
module.exports = function (app) {
    var models = require('./model/models.server')();

    var connectionString = 'mongodb://127.0.0.1:27017/PokemonTCG';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.Promise = require('bluebird');

    mongoose.connect(connectionString);

    require("./services/rest/card.service.server")(app, models);
    require("./services/rest/pokemon.service.server")(app, models);
    require("./services/user.service.server")(app, models);
    require("./services/pokemon.service.server")(app, models);
    require("./services/like.service.server")(app, models);
    require("./services/review.service.server")(app, models);
    require("./services/card.service.server")(app, models);

};