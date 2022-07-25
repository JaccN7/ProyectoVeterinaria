const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mascota = require('../models/mascota');

//Cargar todas las mascotas
router.get('/', async (req, res, next) => {
    const arrayMascotasDB = await Mascota.find();
    res.render('dashboardPets', { titulo: 'Veterinaria - Dashboard', arrayMascotasDB });
});

//Cargar una mascota
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const mascotaDB = await Mascota.findById(id);
        console.log(mascotaDB);
    } catch (error) {
        console.log(error);
    }
});

//Ingresar una mascota
router.post('/', async (req, res, next) => {
    try {
        const mascota = new Mascota({
            _id: new mongoose.Types.ObjectId(),
            nombre: req.body.nombreMascota,
            nombre_tutor: req.body.nombreTutor,
            especie: req.body.especie,
            raza: req.body.raza,
            color: req.body.color,
            sexo: req.body.sexo
        });
        const result = await mascota.save();
        console.log(result);
        res.redirect('/dashboardPets');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

//Eliminar una mascota
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await Mascota.deleteOne({ _id: id });
        res.status(200).json({ message: 'Mascota eliminada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al eliminar la mascota' });
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await Mascota.findById(id);
        req.on('data', async (data) => {
            body = JSON.parse(data);
            body.id = id;
            //hacer el update 
            await Mascota.updateOne({ _id: id }, { $set: { nombre: body.nombre, nombre_tutor: body.nombre_tutor, especie: body.especie, raza: body.raza, color: body.color, sexo: body.sexo } });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar la mascota' });
    }
});

module.exports = router;