module.exports = function (app) {
    var model = require ("./model/models.server.js")();
    require("./services/pokemon/card.service.server")(app,model);
    require("./services/pokedex/pokedex.service.server")(app, model);
};