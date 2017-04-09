module.exports = function (app) {
    var models = require ("./model/models.server.js")();

    require("./services/pokedex/pokedex.service.server")(app, models);
    require("./services/pokemon/rest/card.service.server")(app, models);
    require("./services/pokemon/rest/pokemon.service.server")(app, models);
    require("./services/user.service.server")(app, models);
    require("./services/pokemon/pokemon.service.server")(app, models);
// =======
//     var models = require('./model/models.server')();
//
//     var connectionString = 'mongodb://127.0.0.1:27017/PokemonTCG';
//
//     if(process.env.MLAB_USERNAME) {
//         connectionString = process.env.MLAB_USERNAME + ":" +
//             process.env.MLAB_PASSWORD + "@" +
//             process.env.MLAB_HOST + ':' +
//             process.env.MLAB_PORT + '/' +
//             process.env.MLAB_APP_NAME;
//     }
//
//     var mongoose = require("mongoose");
//     mongoose.Promise = require('bluebird');
//
//     mongoose.connect(connectionString);
//
//     require("./services/pokemon/rest/card.service.server")(app, models);
//     require("./services/pokemon/rest/pokemon.service.server")(app, models);
//     require("./services/user.service.server")(app, models);
//     require("./services/pokemon/pokemon.service.server")(app, models);
//
//
// >>>>>>> master
};