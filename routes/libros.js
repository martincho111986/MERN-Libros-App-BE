const router = require("express").Router();
const {Libro} = require("../models");


  // Leer la lista de libros
  router.get("/", async function (req, res) {
    // const {titulo, autor} = req.query;
    // let libros;
    // if(autor){
    //   libros = await Libro.find(autor)
    // }else{
    //   libros = await Libro.find();
    // }
    
    const libros = await Libro.find(req.query);
    return res.json({ libros });
  });
  
  router.get("/:id", async function (req, res) {
      const {id} = req.params;
      const libro = await Libro.findById(id);
      res.json(libro)
    });
  
  
  // Ingresar un libro nuevo
  router.post("/", async function (req, res) {
    const { titulo, anioPublicacion, autor, url, genero } = req.body;
    const libroExistente = libros = await Libro.findOne({titulo})
  
    if(libroExistente){
      res.json({message: "El Lirbo ya existe"});
    }else{
      const libro = new Libro({titulo, anioPublicacion, autor, url, genero});
      const response = await libro.save(); //esta es una operacion asincrona
      res.json(response);
    }
 
  });
  
  // Actualizar un libro existente
  router.put("/", async function (req, res) {
      const { id, newTitulo, newAnioPublicacion, newAutor, newUrl, newGenero } = req.body;
      const response = await Libro.findByIdAndUpdate(id, 
          {titulo: newTitulo,
          anioPublicacion: newAnioPublicacion,
          autor: newAutor,
          url: newUrl,
          genero: newGenero});
  
      if(response){
          res.json({message: 'datos actualizados'});
      } else{
          res.json({message: 'libro no encontrado'});
      }
  
  });
  
  
  // Eliminar un libro existente
  router.delete("/:id", async function (req, res) {
    const {id} = req.params;
    const response = await Libro.findByIdAndDelete(id)
  
    if(response){
        res.json({message: 'libro eliminado'})
    }else{
        res.json({message: 'libro no encontrado'})
    }
    
  });

  module.exports = router;