var mongoose = require("./connect");
var RESTAURANTSCHEMA = new mongoose.Schema({
    nombre: {
        type: String,
        default: "None nombre",
        required: [true, "El nombre es necesario"]
    },
    nit: {
        type: String,
        default: "None nit",
        required: [true, "El nit es necesario"]
    },
    propietario: {
        type: String,
        default: "None propietario",
        required: [true, "El propietario es necesario"]
    },
    direccion: {
        type: String,
        default: "None direcion",
        required: [true, "El direccion es necesario"]
    },
    telefono: {
        type: String,
        default: "None telefono",
        required: [true, "El telefono es necesario"]
    },
    log: {
        type: String,
        default: "None log",
        required: [true, "El log es necesario"]
    },
    lat: {
        type: String,
        default: "None lat",
        required: [true, "El lat es necesario"]
    },
    logo: {
        type: String,
        default: "no logo",
        required: [true, "El log es necesario"]
    },
    creacion: {
        type: Date,
        default: new Date()
    },
    foto: {
        type: String,
        required: [true, "la ruta de la canción es necesaria"]
    }
});
var RESTAURANT = mongoose.model("restaurant", RESTAURANTSCHEMA);
module.exports = RESTAURANT;