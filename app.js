const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

mongoose.connect('mongodb+srv://martin:martin123$@cluster0-qtg2d.mongodb.net/libreria?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const Libro = mongoose.model("Libro", {
    titulo: String,
    anioPublicacion: Number,
    autor: String,
    url: String,
    genero: String
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Direccionamiento / Rutas

// Ruta Raiz
router.get("/", function (req, res) {
  return res.send("Hola Rolling desde Express");
});

// Leer la lista de users
router.get("/libros", async function (req, res) {
  const libros = await Libro.find();
  return res.json({ libros });
});

router.get("/libros/:id", async function (req, res) {
    const {id} = req.params;
    const libro = await Libro.findById(id);
    res.json(libro)
  });


// Ingresar un usuario nuevo
router.post("/libros", async function (req, res) {
  const { titulo, anioPublicacion, autor, url, genero } = req.body;
  const libro = new Libro({titulo, anioPublicacion, autor, url, genero});
  const response = await libro.save(); //esta es una operacion asincrona
  res.json(response);

  
});

// Actualizar un usuario existente
router.put("/libros", async function (req, res) {
    const { id, newTitulo, newAnioPublicacion, newAutor, newUrl, newGenero } = req.body;
    const response = await Libro.findByIdAndUpdate(id, 
        {titulo: newTitulo,
        anioPublicacion: newAnioPublicacion,
        autor: newAutor,
        url: newUrl,
        genero: newGenero}
        );

    if(response){
        console.log(response)
        res.json({message: 'datos actualizados'});
    } else{
        res.json({message: 'libro no encontrado'});
    }

});


// Eliminar un usuario existente
router.delete("/libros", async function (req, res) {
  const {id} = req.body;
  const response = await Libro.findByIdAndDelete(id)

  if(response){
      res.json({message: 'libro eliminado'})
  }else{
      res.json({message: 'libro no encontrado'})
  }
  
});


//registramos las rutas del proyecto
app.use("/api", router);

app.listen(8080, console.log("Servidor iniciado en puerto 8080"));