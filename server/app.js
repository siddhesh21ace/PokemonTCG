module.exports = function (app) {
    var model = require ("./model/models.server.js")();
    require("./services/pokedex/pokedex.service.server")(app, model);
    require("./services/pokemon/card.service.server")(app);
    require("./services/pokemon/pokemon.service.server")(app);
};