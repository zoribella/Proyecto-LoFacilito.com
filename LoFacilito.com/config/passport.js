// ESTRATEGIA LOCAL
const estrategiaLocal = require('passport-local').Strategy;
// SE DEFINE EL USER
const User = require('../app/models/user');
// EXPORTAMOS PASSPORT
module.exports = function(passport){
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    //  Metodo de Registro
    passport.use('local-registro', new estrategiaLocal({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        User.findOne({'local.email': email}, function ( err, user){
            if(err){ return done(err);}
            if (user){
                return done(null, false, req.flash('signupMessage', 'El Email ya esta registrado'));
            } else {
               var nuevoUsuario = new User();  
               nuevoUsuario.local.email = email;
               nuevoUsuario.local.passport = nuevoUsuario.generaHash(password);
               nuevoUsuario.save(function(err){
                   if (err) {throw err}
                   return done(null, nuevoUsuario);
               });
            }
        })
    }));

    //  Metodo de Login
    passport.use('local-login', new estrategiaLocal({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        User.findOne({'local.email': email}, function ( err, user){
            if(err){ return done(err);}
            if (!user){
                return done(null, false, req.flash('loginMessage', 'El usuario no se encuentra'));
            } 
            if (!user.validarContraseña(password)) {
                return done(null, false, req.flash('loginMessage', 'Contraseña invalida'));
            }
            return done(null, user);
        })
    }));
}