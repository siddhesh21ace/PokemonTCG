/**
 * Created by Nitin on 4/5/2017.
 */
module.exports = function (app, model) {
    var Pokedex = require('pokedex-promise-v2');
    var P = new Pokedex();

    app.post("/api/pokedex/getPokedexSearch/", getPokedexSearch);
    app.get('/api/pokedex/getPokemonDetails/:pokemon', getPokemonDetails);
    app.get('/api/pokedex/fetchPokemons/:str', fetchPokemons);
    app.get('/api/pokedex/fetchAllPokemons/',fetchAllPokemons);
    app.get('/api/pokedex/getAllPokemons/', getAllPokemons);

    function getAllPokemons(req,res){
        P.getPokemonsList() // with Promise
            .then(function(response) {
                //console.log("response ", response.results);
                res.json(response.results);
            })
            .catch(function(error) {
                res.sendStatus(400);
                console.log('There was an ERROR: ', error);
            });
    }
    function fetchPokemons(req, res){
        var str = req.params.str;
        //console.log('str '+ str);

        model.pokedexModel.fetchPokemons(str)
                    .then(
                        function(pokemons){
                            //console.log(pokemons);
                            res.send(pokemons);
                        },
                        function(error){
                            res.sendStatus(400);
                        }
                    )
    }


    function fetchAllPokemons(req, res){
        model.pokedexModel.fetchAllPokemons()
            .then(
                function(pokemons){
                    res.send(pokemons);
                },
                function(error){
                    res.sendStatus(400);
                }
            )
    }


    function getPokemonDetails(req, res){
        var name =req.params.pokemon;

       // console.log(name);

        P.getPokemonByName(name) // with Promise
            .then(function(response) {
                res.json(response);
            })
            .catch(function(error) {
                res.sendStatus(404);
                //console.log('There was an ERROR: ', error);
            });
    }

    function getPokedexSearch(req, res){
        var pokedex = req.body;
        var query = pokedex.query;
        var category = pokedex.category;
        //console.log(pokedex, query, category);

        if(category == "pokemon"){

            P.getPokemonByName(query) // with Promise
                .then(function(response) {
                    //console.log(response);
                    res.json(response);
                })
                .catch(function(error) {
                    res.sendStatus(404);
                    console.log('There was an ERROR: ', error);
                });

        } else if(category == "evolution"){
            P.getEvolutionTriggerByName("level-up")
                .then(function(response) {
                    res.json(response);
                    //console.log(response);
                })
                .catch(function(error) {
                    res.sendStatus(404);
                    console.log('There was an ERROR: ', error);
                });
        } else if(category == "location"){
            P.getLocationsList()
                .then(function(response) {
                    res.send(response);
                    //console.log(response);
                })
                .catch(function(error) {
                    res.sendStatus(404);
                    console.log('There was an ERROR: ', error);
                });

        } else if(category == "contests"){

            P.getContestTypesList()
                .then(function(response) {
                    res.send(response);
                    //console.log(response);
                })
                .catch(function(error) {
                    res.sendStatus(404);
                    console.log('There was an ERROR: ', error);
                });

        } else if(category == "moves"){
            P.getMovesList()
                .then(function(response) {
                    res.send(response);
                   // console.log(response);
                })
                .catch(function(error) {
                    res.sendStatus(404);
                    console.log('There was an ERROR: ', error);
                });

        }
    }
};
