/**
 * Created by Siddhesh on 4/6/2017.
 */
module.exports = function (app) {
    var Pokedex = require('pokedex-promise-v2');
    var P = new Pokedex();

    app.get("/api/type", findAllPokemons);
    app.get("/api/pokemon/:pokemonID", findPokemonByIDorName);

    function findAllPokemons(req, res) {
        P.getPokemonsList()
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.json(error);
            });
    }

    function findPokemonByIDorName(req, res) {
        var pokemonID = req.params.pokemonID;
        var pokemon = {};
        P.getPokemonByName(pokemonID)
            .then(function (response) {
                pokemon.name = response.name;
                pokemon.weight = response.weight;
                pokemon.height = response.height;
                pokemon.id = response.id;
                pokemon.order = response.order;
                pokemon.name = response.name;
                pokemon.base_experience = response.base_experience;
                setPokemonTypes(pokemon, response);
                setPokemonAbilities(pokemon, response);
                setPokemonStats(pokemon, response);
                setPokemonMoves(pokemon, response);
                return P.getPokemonSpeciesByName(pokemon.name);
            }, function (error) {
                res.status(404).send(error);
            })
            .then(function(response) {
                pokemon.species.habitat = response.habitat.name;
                pokemon.species.color = response.color.name;
                pokemon.species.shape = response.shape.name;
                pokemon.species.evolves_from = response.evolves_from_species.name;
                pokemon.species.description = setPokemonDesc(pokemon, response);
                pokemon.species.genus = setPokemonGenus(pokemon, response);
                var split_array = response.evolution_chain.url.split("/");
                var evoChainID = split_array[split_array.length - 2];
                return P.getEvolutionChainById(evoChainID);
            }, function(error) {
                res.status(404).send(error);
            })
            .then(function (response) {
                var evoChain = {};
                var evoData = response.chain;
                do {
                    var evoDetails = evoData['evolution_details'][0];
                    evoChain.push({
                        "species_name": evoData.species.name
                    });

                    evoData = evoData['evolves_to'][0];
                } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
                pokemon.species.evoChain = evoChain;
            }, function(error) {
                res.status(404).send(error);
            })
    }

    function setPokemonDesc(pokemon, response) {
        var fte = response.flavor_text_entries;
        for (var i in fte) {
            if(fte[i].language.name === "en") {
                pokemon.desc = fte[i].flavor_text;
                break;
            }
        }
    }

    function setPokemonGenus(pokemon, response) {
        var gen = response.genera;
        for (var i in gen) {
            if(gen[i].language.name === "en") {
                pokemon.genus = gen[i].genus;
                break;
            }
        }
    }

    function setPokemonTypes(pokemon, response) {
        response.types.forEach(function(obj) {
            pokemon.types.push(obj.type.name);
        });
    }

    function setPokemonAbilities(pokemon, response) {
        response.abilities.forEach(function(obj) {
            pokemon.abilities.push(obj.ability.name);
        });
    }

    function setPokemonStats(pokemon, response) {
        response.stats.forEach(function (obj) {
            var stat = {
                name: obj.stat.name,
                base_stat: obj.base_stat
            }
            pokemon.stats.push(stat);
        });
    }

    function setPokemonMoves(pokemon, response) {
        response.moves.forEach(function(obj) {
            pokemon.moves.push(obj.move.name);
        });
    }


}