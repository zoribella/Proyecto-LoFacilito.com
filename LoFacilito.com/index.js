const express = require('express')
const exphbs = require('express-handlebars')

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', function(req, res){
    res.render('home');
});

app.get('/login', function(req, res){
    res.render('login')
})

app.get('/registro', function(req, res){
    res.render('registro')
})

app.get('/detalle', function(req, res){
    res.render('detalle')
})

app.get('/lista-anuncios', function(req, res){
    res.render('lista-anuncios')
})

app.use(express.static('public'));

app.listen(3000, function(){
});