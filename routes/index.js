const router = require("express").Router();
const rutasLibros = require("./libros");

// Ruta Raiz
router.get("/", function (req, res) {
    return res.send("Hola Rolling desde Express");
  });
  
  //Otras Rutas

  router.use("/libros", rutasLibros);

  module.exports = router;