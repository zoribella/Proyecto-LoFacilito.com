module.exports = (app, passport)=>{

    app.get('/', (req, res) => {
        res.render('home', {selected: {home: true} });
    });

    app.get('/login', (req, res)=>{
        res.render('login', {selected: {login: true} }, {
            message: req.flash('LoginMessage')
        });
    });

    //app.post('/login', passport.authenticate(''));

    app.get('/registro', (req, res)=>{
        res.render('registro', { selected: {registro: true} }, {
            message: req.flash('signupMessage')
        });
    });

    app.post('/registro', passport.authenticate('local-registro', {
        successRedirect: '/perfil',
        failureRedirect: '/registro',
        failureFlash: true
    }));

    app.get('/perfil', (req, res)=>{
        res.render('perfil', {
            user: req.user
        });
    });
    
    app.get('/detalle', (req, res)=>{
        res.render('detalle')
    });
    
    app.get('/lista-anuncios', (req, res)=>{
        res.render('lista-anuncios')
    });
}; 