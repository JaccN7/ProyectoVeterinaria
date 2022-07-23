const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 3000;


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


const url = `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PW}@cluster0.dluii.mongodb.net/${process.env.MONGO_ATLAS_BD}?retryWrites=true&w=majority`

//Conexión a BD MongoDB
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión a BD MongoDB exitosa');
}).catch(err => {
    console.log('Error al conectar a BD MongoDB');
    console.log(err);
});

//Motor de plantillas EJS | Rutas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Carpeta publica | Rutas
app.use('/public', express.static(path.join(__dirname, './public')))

//Rutas 
app.use('/', require('./router/loginRoutes'));
app.use('/dashboardPets', require('./router/mascotasRoutes'));
//manejo de errores
app.use('/', require('./router/errorRoutes'));

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}, el enlace es http://localhost:${port}`);
});