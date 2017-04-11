/**
 * Created by Siddhesh on 4/6/2017.
 */
module.exports = function (app, models) {
    var Pokedex = require('pokedex-promise-v2');
    var P = new Pokedex();

    app.get("/rest/api/pokemon", findAllPokemons);
    app.get("/rest/api/pokemon/:pokemonID", findPokemonByIDorName);
    app.get("/rest/api/type", findAllTypes);
    app.get("/rest/api/type/:typeID", findTypeByIDorName);
    app.get("/rest/api/type/:typeID/pokemon", findPokemonsByTypeIDorName);

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
                setPokemonWeaknesses(pokemon, response);
                setPokemonAbilities(pokemon, response);
                setPokemonStats(pokemon, response);
                setPokemonMoves(pokemon, response);
                return P.getPokemonSpeciesByName(pokemon.name);
            }, function (error) {
                res.status(404).send(error);
            })
            .then(function (response) {
                pokemon.species = {};
                pokemon.species.habitat = response.habitat.name;
                pokemon.species.color = response.color.name;
                pokemon.species.shape = response.shape.name;
                pokemon.species.evolves_from =
                    response.evolves_from_species ?
                        response.evolves_from_species.name :
                        "";

                setPokemonDesc(pokemon, response);
                setPokemonGenus(pokemon, response);
                var split_array = response.evolution_chain.url.split("/");
                var evoChainID = split_array[split_array.length - 2];
                return P.getEvolutionChainById(evoChainID);
            }, function (error) {
                res.status(404).send(error);
            })
            .then(function (response) {
                var evoChain = [];
                var evoData = response.chain;
                do {
                    var evoDetails = evoData['evolution_details'][0];
                    var split_array = evoData.species.url.split("/");
                    var pokeID = split_array[split_array.length - 2];

                    evoChain.push({
                        "species_name": evoData.species.name,
                        "species_id": pokeID
                    });

                    evoData = evoData['evolves_to'][0];
                } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
                pokemon.species.evoChain = evoChain;
                res.json(pokemon);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function setPokemonWeaknesses(pokemon, response) {
        pokemon.weaknesses = [];

        response.types.forEach(function (obj) {
            P.getTypeByName(obj.type.name)
                .then(function (type) {
                    var double_damages = type.damage_relations.double_damage_from;
                    for (var i in double_damages) {
                        pokemon.weaknesses.push(double_damages[i].name);
                    }
                }, function (error) {
                    console.log(error);
                })
        });
    }

    function setPokemonDesc(pokemon, response) {
        var fte = response.flavor_text_entries;
        for (var i in fte) {
            if (fte[i].language.name === "en") {
                pokemon.species.description = fte[i].flavor_text;
                break;
            }
        }
    }

    function setPokemonGenus(pokemon, response) {
        var gen = response.genera;
        for (var i in gen) {
            if (gen[i].language.name === "en") {
                pokemon.species.genus = gen[i].genus;
                break;
            }
        }
    }

    function setPokemonTypes(pokemon, response) {
        pokemon.types = [];

        response.types.forEach(function (obj) {
            pokemon.types.push(obj.type.name);
        });
    }

    function setPokemonAbilities(pokemon, response) {
        pokemon.abilities = [];

        response.abilities.forEach(function (obj) {
            P.getAbilityByName(obj.ability.name)
                .then(function (ability) {
                    var effects = ability.effect_entries;
                    for (var i in effects) {
                        if (effects[i].language.name === "en") {
                            pokemon.abilities.push({
                                name: obj.ability.name,
                                description: effects[i].short_effect
                            })
                            break;
                        }
                    }
                }, function (error) {
                    console.log(error);
                })
        });
    }

    function setPokemonStats(pokemon, response) {
        pokemon.stats = [];

        response.stats.forEach(function (obj) {
            var stat = {
                name: obj.stat.name,
                base_stat: obj.base_stat
            }
            pokemon.stats.push(stat);
        });
    }

    function setPokemonMoves(pokemon, response) {
        pokemon.moves = [];

        response.moves.forEach(function (obj) {
            pokemon.moves.push(obj.move.name);
        });
    }

    function findAllTypes(req, res) {
        P.getTypesList()
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.json(error);
            });
    }

    function findTypeByIDorName(req, res) {
        var typeID = req.params.typeID;
        P.getTypeByName(typeID)
            .then(function (response) {
                res.json(response);
            })
            .catch(function (error) {
                res.json(error);
            });
    }
    
    function findPokemonsByTypeIDorName(req, res) {
        var typeID = req.params.typeID;
        P.getTypeByName(typeID)
            .then(function (response) {
                res.json(response.pokemon);
            })
            .catch(function (error) {
                res.json(error);
            });
    }
}