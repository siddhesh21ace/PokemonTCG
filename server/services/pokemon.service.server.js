module.exports = function (app, models) {
    app.get("/api/pokemon", findPokemon);
    app.get("/api/pokemon/:pokemonId", findPokemonById);
    app.post("/api/pokemon", createPokemon);

    function findPokemonById(req, res) {
        var pokemonId = req.params['pokemonId'];

        models.pokemonModel
            .findPokemonById(pokemonId)
            .then(function (pokemon) {
                res.json(pokemon);
            }, function (error) {
                res.status(404).send(error);
            });
    }

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
                            });
                    } else {
                        res.status(401).send("Pokemon already exists!");
                    }
                },
                function (err) {
                    res.status(400).send("Error occured. Please try again!");
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

};