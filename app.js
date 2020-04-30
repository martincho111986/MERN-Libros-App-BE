const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require("./routes");
const app = express();

//conectando a la base de datos MongoDB Atlas
mongoose.connect('mongodb+srv://martin:martin123$@cluster0-qtg2d.mongodb.net/libreria?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, 
() => console.log("conectado a mongoDB Atlas"));


// parse application/x-www-form-urlencoded // procesamiento de formularios
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


//registramos las rutas del proyecto
app.use("/api", router);

//iniciar la aplicacion con toda la configuracion previa
app.listen(8080, console.log("Servidor iniciado en puerto 8080"));