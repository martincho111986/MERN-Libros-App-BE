const mongoose = require("mongoose");

const Libro = mongoose.model("Libro", {
    titulo: String,
    anioPublicacion: Number,
    autor: String,
    url: String,
    genero: String
})

module.exports = {
    Libro
};