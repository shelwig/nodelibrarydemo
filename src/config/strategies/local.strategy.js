var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    function (username, password, done) {
        var url = 'mongodb://localhost:C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==@localhost:10250/libraryApp?ssl=true&3t.sslSelfSignedCerts=true';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('users');
            collection.findOne({
                username: username
            },
                function(err, results) {
                    if (results.password === password) {
                        var user = results;
                        done(null, user);
                    } else {
                        done(null, false, {message: 'Bad password'});
                    }
                }
            );
        });
    }));
};