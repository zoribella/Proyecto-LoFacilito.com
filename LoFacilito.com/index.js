const express = require('express');
const app = express();

const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

/* Base de datos*/
const { url } = require('./config/database');
/* Conectando a la BD*/
mongoose.connect(url, {
    useMongoClient:true
});

require('./config/passport')(passport);

 // Settingh
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

//  Middlewares
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(session({
        secret: 'facilito',
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

// Routes
require('./app/routes')(app, passport);

//  Static Files
app.use(express.static(path.join(__dirname, 'public')));


app.listen(3000, function(){
});