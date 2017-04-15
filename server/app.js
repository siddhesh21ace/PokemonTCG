module.exports = function (app) {
    var models = require("./model/models.server.js")();

    require("./services/pokedex/pokedex.service.server")(app, models);

    require("./services/rest/card.service.server")(app, models);
    require("./services/rest/pokemon.service.server")(app, models);

    require("./services/user.service.server")(app, models);
    require("./services/pokemon.service.server")(app, models);
    require("./services/like.service.server")(app, models);
    require("./services/review.service.server")(app, models);
    require("./services/card.service.server")(app, models);
    require("./services/game.service.server")(app, models);

};