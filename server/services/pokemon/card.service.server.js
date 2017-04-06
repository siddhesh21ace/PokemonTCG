/**
 * Created by Siddhesh on 4/5/2017.
 */
module.exports = function (app) {
    const pokemon = require('pokemontcgsdk');

    app.get("/api/card", findCards);
    app.get("/api/card/:cardID", findCardById);

    function findCards(req, res) {
        var criteria = {
            pageSize:1000,
            supertype: 'Pokémon'
        };

        criteria.setCode = req.query.setCode ? req.query.setCode : "xyp";
        criteria.types = req.query.types ? req.query.types : "";
        criteria.name = req.query.name ? req.query.name : "";
        criteria.weaknesses = req.query.weaknesses ? req.query.weaknesses : "";
        criteria.attackDamage = req.query.attackDamage ? req.query.attackDamage : "";
        criteria.attackCost = req.query.attackCost ? req.query.attackCost : "";
        criteria.retreatCost = req.query.retreatCost ? req.query.retreatCost : "";
        criteria.hp = req.query.hp ? req.query.hp : "";

        pokemon.card.where(criteria)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                console.log(error);
            });
    }

    function findCardById(req, res) {
        var cardID = req.params['cardID'];
        pokemon.card.find(cardID)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                console.log(error);
            });
    }
};
