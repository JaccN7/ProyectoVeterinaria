//Esquema de una mascota usada en dashboard
const mongoose = require('mongoose');
const mascotaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    nombre_tutor: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    especie: {
        type: String,
        required: true
    },
    raza: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Mascota', mascotaSchema);