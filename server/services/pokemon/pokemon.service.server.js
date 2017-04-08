/**
 * Created by Siddhesh on 4/8/2017.
 */
module.exports = function (app, models) {
    app.get("/api/pokemon", findPokemon);
    app.get("/api/pokemon/:pokemonId", findPokemonByPokeId);
    app.put("/api/pokemon/:pokemonId", updatePokemon);
    app.post("/api/pokemon", createPokemon);
    app.delete("/api/pokemon/:pokemonId", deletePokemon);

    function findPokemon(req, res) {
        var name = req.query['name'];
        if(name) {
            models.pokemonModel
                .findPokemonByName(name)
                .then(function (response) {
                    res.status(200).send(response);
                }, function (error) {
                    res.status(404).send(error);
                });
        } else {
            getAllPokemons(req, res);
        }
    }

    function createPokemon(req, res) {
        var newPokemon = req.body;

        models.pokemonModel
            .findPokemonByPokeId(newPokemon.poke_id)
            .then(function (pokemon) {
                    if (pokemon === null) {
                        models.pokemonModel.createPokemon(newPokemon)
                            .then(function (pokemon) {
                                res.json(pokemon);
                            }, function (error) {
                                res.status(400).send("Error occured. Please try again!");
                                console.log(error);
                            });
                    } else {
                        res.status(401).send("Pokemon already exists!");
                    }
                },
                function (err) {
                    res.status(400).send("Error occured. Please try again!");
                    console.log(err);
                }
            )
    }

    function getAllPokemons(req, res) {
        models.pokemonModel
            .getAllPokemons()
            .then(function (pokemons) {
                res.json(pokemons);
            }, function (error) {
                res.status(404).send("No Pokemon Found: " + error);
            });
    }

    function findPokemonByPokeId(req, res) {
        var pokemonId = req.params['pokemonId'];

        models.pokemonModel
            .findPokemonByPokeId(pokemonId)
            .then(function (pokemon) {
                res.json(pokemon);
            }, function (error) {
                res.status(404).send("Pokemon not found for the Poke ID : " + pokemonId + " with error " + error);
            });
    }

    function updatePokemon(req, res) {
        var pokemonId = req.params['pokemonId'];
        var updatedPokemon = req.body;

        models.pokemonModel
            .updatePokemon(pokemonId, updatedPokemon)
            .then(function (response) {
                if (response.nModified === 1) {
                    models.pokemonModel
                        .findPokemonByPokeId(pokemonId)
                        .then(function (pokemon) {
                            res.json(pokemon);
                        }, function () {
                            res.sendStatus(404);
                        })
                }
                else {
                    res.status(404).send("Pokemon update failed.");
                }
            }, function (error) {
                res.sendStatus(404).send("Pokemon update failed with error: " + error);
            });
    }

    function deletePokemon(req, res) {
        var pokemonId = req.params['pokemonId'];

        models.pokemonModel
            .deletePokemon(pokemonId)
            .then(function (response) {
                res.status(200).send(response);
            }, function (error) {
                res.status(404).send(error);
            });
    }
}