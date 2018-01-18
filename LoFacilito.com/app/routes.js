module.exports = (app, passport)=>{

    app.get('/', (req, res) => {
        res.render('home', {selected: {home: true} });
    });

    app.get('/login', (req, res)=>{
        res.render('login', {selected: {login: true} }, {
            message: req.flash('LoginMessage')
        });
    });

    //app.post('/login', (req, res) => ());

    app.get('/registro', (req, res)=>{
        res.render('registro', { selected: { registro: true}})
    });
    
    app.get('/detalle', (req, res)=>{
        res.render('detalle')
    });
    
    app.get('/lista-anuncios', (req, res)=>{
        res.render('lista-anuncios')
    });
}; 