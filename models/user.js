const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        minlength: 6,
        maxlength: 255,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    nombre: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    rol: {
        type: String,
        required: true,
        enum: ['admin', 'user', 'tester']
    }
});

module.exports = mongoose.model('User', userSchema);