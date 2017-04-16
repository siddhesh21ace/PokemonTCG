module.exports = function (app, models) {
    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    /* Image Upload Starts*/
    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+'/../../public/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() +"."+ file.mimetype.split("/")[1]) //Appending .jpg
        }
    })

    var upload = multer({ storage: storage });
    app.post("/api/user/upload", upload.single('file'), uploadImage);

    /* Image Upload ends */

    passport.use(new LocalStrategy({}, localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get("/api/user", findUser);
    app.get("/api/user/:userID", findUserById);
    app.put("/api/user/:userID", selfLoggedIn, updateUser);
    app.delete("/api/user/:userID", selfLoggedIn, deleteUser);

    app.post("/api/isLoggedIn", isLoggedIn);
    app.post("/api/logout", logout);
    app.post("/api/register", register);

    app.post('/api/isAdmin', isAdmin);
    app.post('/api/admin/user', checkAdmin, createUser);
    app.get('/api/admin/user', checkAdmin, getAllPlayers);
    app.put('/api/admin/user/:userID', checkAdmin, updateUser);
    app.delete('/api/admin/user/:userID', checkAdmin, deleteUser);

    app.get('/api/player', getAllPlayers);

    app.post('/api/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return res.send(err);
            }
            if (!user) {
                return res.status(404).send(info);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.send(err);
                }
                return res.json(user);
            });
        })(req, res, next);
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/index.html#!/user',
            failureRedirect: '/index.html#!/login'
        }));

    var facebookConfig = {
        clientID: process.env.PROJECT_FACEBOOK_CLIENT_ID,
        clientSecret: process.env.PROJECT_FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.PROJECT_FACEBOOK_CALLBACK_URL,
        //enableProof: true,
        profileFields: ['id', 'displayName', 'photos', 'email']
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        models.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            username: names[0],
                            lastName: names[1],
                            firstName: names[0],
                            email: profile.emails ? profile.emails[0].value : "",
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return models.userModel.createUser(newFacebookUser);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    /* Google Auth */

    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/index.html#!/user',
            failureRedirect: '/index.html#!/login'
        }));

    var googleConfig = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        models.userModel
            .findUserByGoogleId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var newGoogleUser = {
                            username: profile.name.givenName,
                            lastName: profile.name.familyName,
                            firstName: profile.name.givenName,
                            email: profile.emails[0].value,
                            google: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return models.userModel.createUser(newGoogleUser);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function selfLoggedIn(req, res, next) {
        var loggedIn = req.isAuthenticated();
        var userId = req.params.userID;
        var self = (userId == req.user._id);
        if (self && loggedIn) {
            next();
        } else {
            res.status(400).send("Invalid modification attempt!");
        }
    }

    function logout(req, res) {
        req.logout();
        res.status(200).send({});
    }

    function localStrategy(username, password, done) {
        models
            .userModel
            .findUserbyUsername(username)
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false, 'Incorrect username!');
                    }
                    if (!bcrypt.compareSync(password, user.password)) {
                        return done(null, false, 'Incorrect password!');
                    }
                    return done(null, user);
                },
                function (error) {
                    return done(error);
                }
            );
    }

    function login(req, res) {
        res.json(req.user);
    }

    function serializeUser(user, done) {
        done(null, user._id);
    }

    function deserializeUser(id, done) {
        models.userModel
            .findUserById(id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function isLoggedIn(req, res) {
        var isRequestAuthenticated = req.isAuthenticated();
        res.send(isRequestAuthenticated ? req.user : '0');
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);
        newUser.roles = ["PLAYER"];

        models.userModel
            .findUserbyUsername(newUser.username)
            .then(function (user) {
                    if (user === null) {
                        models.userModel.createUser(newUser)
                            .then(function (user) {
                                if (user) {
                                    req.login(user, function (error) {
                                        if (error) {
                                            res.status(400).send("Error occured. Please try again!");
                                            console.log(error);
                                        } else {
                                            res.json(user);
                                        }
                                    });
                                }
                            }, function (error) {
                                res.status(400).send("Error occured. Please try again!");
                                console.log(error);
                            });
                    } else {
                        res.status(401).send("User already exists!");
                    }
                },
                function (err) {
                    res.status(400).send("Error occured. Please try again!");
                    console.log(err);
                }
            )
    }

    function findUserById(req, res) {
        var userId = req.params['userID'];

        models.userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.status(404).send("User not found for the user ID : " + userId + " with error " + error);
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        models.userModel
            .findUserbyUsername(username)
            .then(function (users) {
                if (users.length !== 0) {
                    res.json(users[0]);
                }
                else {
                    res.status(404).send("User not found for username: " + username);
                }
            }, function (error) {
                res.status(404).send("User not found for username: " + username + " with error: " + error);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        models.userModel
            .findUserByCredentials(username, password)
            .then(function (users) {
                if (users.length !== 0) {
                    res.json(users[0]);
                }
                else {
                    res.status(404).send('User not found for username: ' + username + ' and password: ' + password);
                }
            }, function (error) {
                res.status(404).send('User not found for username: ' + username + ' and password: ' + password +
                    " with error: " + error);
            });
    }

    function updateUser(req, res) {
        var userID = req.params['userID'];
        var updatedUser = req.body;

        models.userModel
            .updateUser(userID, updatedUser)
            .then(function (response) {
                if (response.nModified === 1) {
                    models.userModel
                        .findUserById(userID)
                        .then(function (user) {
                            res.json(user);
                        }, function () {
                            res.sendStatus(404);
                        })
                }
                else {
                    res.status(404).send("User update failed.");
                }
            }, function (error) {
                res.sendStatus(404).send("User update failed with error: " + error);
            });
    }

    function deleteUser(req, res) {
        var userID = req.params['userID'];

        if (!(req.user.roles.indexOf('ADMIN') > -1)) {
            req.logout();
        }

        models.userModel
            .deleteUser(userID)
            .then(function (response) {
                res.status(200).send(response);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        } else {
            res.json(req.user);
        }
    }

    function uploadImage(req, res){
        var myFile = req.file;

        var originalname = myFile.originalname;
        var filename = myFile.filename;
        var path = myFile.path;
        var destination = myFile.destination;
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        //console.log(myFile);
        res.send(myFile);
    }

    /* Admin Functions */

    function isAdmin(req, res) {
        res.send(req.isAuthenticated() &&
        req.user.roles &&
        req.user.roles.indexOf('ADMIN') > -1 ? req.user : '0');
    }

    function checkAdmin(req, res, next) {
        if(req.isAuthenticated() &&
            req.user.roles &&
            req.user.roles.indexOf('ADMIN') > -1) {
            next();
        } else {
            res.status(401).send({});
        }
    }

    function createUser(req, res) {
        models.userModel
            .createUser(req.body)
            .then(function (response) {
                res.json(response)
            }, function (error) {
                res.status(500).send(error);
            });
    }

    function findAllUsers(req, res) {
        models.userModel
            .findAllUsers()
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status(500).send(error);
            });
    }

    function getAllPlayers(req, res) {
        return models.userModel.getAllPlayers()
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status(500).send(error);
            });
    }

};