
// CREO MODELO PARA USARLO EN PASSPORT Y GUARDAR EN LA BD
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    local: {
        email: String,
        contraseña: String
    }

    //si quiero autenticar con facebook o google agrego lo mismo con id, 
});

// cifro contraseña 
userSchema.methods.generaHash = function (contraseña){
    return bcrypt.hashSync(contraseña, bcrypt.genSaltSync(8), null);
};

// Valido contraseña
userSchema.methods.validarContraseña = function(contraseña){
    return bcrypt.compareSync(contraseña, this.local.contraseña);
};

module.exports = mongoose.model('User', userSchema);