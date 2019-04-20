const IndividualUser = require('../db/models/user').individual;
const LocalStrategy = require('passport-local').Strategy;

// Standard Local Strategy, connected to the IndividualUser collection
const strategy = new LocalStrategy({usernameField: 'email'},
    (username, password, done) => {
        if( username.indexOf("@") != -1){
            IndividualUser.findOne({'email': username}, (err, userMatch) => {
                if (err)
                    return done(err);
    
                // Check users for authentication
                if (!userMatch)
                {
                    return done(null,false,{message: 'Unregistered'});
                }
                // Use industry standard cryptographically secure password library bcrypt to check passwords
                if (!userMatch.checkPassword(password))
                    return done(null, false, {message: 'Incorrect password'});
    
                // if all pass, then user has logged in
                return done(null, userMatch);
            });
        }
        else{
        IndividualUser.findOne({'name':username},(err,userMatch)=>{
            if (err)
                return done(err);

            // Check users for authentication
            if (!userMatch)
            {
                var i = 1;
            }
            // Use industry standard cryptographically secure password library bcrypt to check passwords
            if (!userMatch.checkPassword(password))
                return done(null, false, {message: 'Incorrect password'});

            // if all pass, then user has logged in
            return done(null, userMatch);
        });
        }
    });

module.exports = strategy;