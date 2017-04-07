/**
 * Created by Siddhesh on 4/5/2017.
 */
module.exports = function (app) {
    require("./services/pokemon/card.service.server")(app);
    require("./services/pokemon/pokemon.service.server")(app);

};