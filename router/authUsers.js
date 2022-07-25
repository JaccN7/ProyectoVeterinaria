const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const User = require('../models/user');

// Schema para Registrar Usuario
const signupSchema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).required(),
    nombre: Joi.string().min(6).max(50).required(),
    rol: Joi.string().valid('admin', 'user', 'tester').required()
});

//Crear un usuario | SIGN UP
router.post('/signup', async (req, res, next) => {
    try {
        const emailUser = await User.findOne({ email: req.body.email });
        if (emailUser) {
            res.status(409).json({ message: 'El email ya existe' });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            //Comprobar que cumpla con el esquema
            const resultado = await signupSchema.validateAsync(req.body);
            if (resultado.error) {
                res.status(400).json({ message: resultado.error.details[0].message });
            }
            const usuario = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                nombre: req.body.nombre,
                rol: req.body.rol
            });
            const result = await usuario.save();
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el usuario',
            error: error
        });
    }
});

//Borrar usuario
router.delete('/:id', async (req, res, next) => {
    try {
        const result = await User.deleteOne({ _id: req.params.id });
        res.status(200).json({
            result: result,
            message: 'Usuario eliminado'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al borrar el usuario',
            error: error
        });
    }
});

//Iniciar sesión | LOGIN
router.post('/login', async (req, res, next) => {
    try {
        const usuario = await User.findOne({ email: req.body.email });
        if (usuario) {
            const validPassword = await bcrypt.compare(req.body.password, usuario.password);
            if (validPassword) {
                const token = jwt.sign({
                    email: usuario.email,
                    _id: usuario._id
                }, process.env.JWT_KEY,
                    {
                        expiresIn: '6h'
                    });
                res.status(200).json({
                    token: token,
                    estado: 200,
                    nombre: usuario.nombre,
                    message: 'Inicio de sesión exitoso'
                });
            } else {
                res.status(401).json({
                    estado: 401,
                    message: 'Contraseña incorrecta'
                });
            }
        } else {
            res.status(404).json({
                estado: 404,
                message: 'Usuario no encontrado'
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
});

module.exports = router;