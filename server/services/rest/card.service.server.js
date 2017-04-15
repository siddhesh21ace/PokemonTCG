/**
 * Created by Siddhesh on 4/5/2017.
 */
module.exports = function (app, models) {
    const pokemon = require('pokemontcgsdk');

    app.get("/rest/api/card", findCards);
    app.get("/rest/api/card/:cardID", findCardById);

    var types = [
        "Colorless",
        "Dark",
        "Darkness",
        "Dragon",
        "Fairy",
        "Fighting",
        "Fire",
        "Grass",
        "Lightning",
        "Metal",
        "Psychic",
        "Water"
    ];

    function findCards(req, res) {
        var criteria = {
            pageSize: 1000,
            supertype: 'Pokémon'
        };

        criteria.subtype = req.query.subtype ? req.query.subtype : "";
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
                cleanUpData(response);
                console.log(response);
                res.json(response);
            }, function (error) {
                console.log(error);
            });
    }

    function isNumber(damage) {
        if (damage === '') {
            return false;
        } else if (isNaN(damage)) {
            return false;
        } else {
            return true;
        }
    }

    function cleanUpData(response) {
        response.forEach(function (card) {
            card.attacks && card.attacks.forEach(function (attack) {
                if (!isNumber(attack.damage)) {
                    attack.damage = "50";
                }
            });
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
