var express = require("express");
var router = express.Router();
var sha1 = require("sha1");
var fileUpload = require("express-fileupload");
var RESTAURANT = require("../database/restaurant");
router.use(fileUpload({
    fileSize: 50 * 1024 * 1024
}));

router.get('/restaurant', (req, res, next) => {
    RESTAURANT.find({}).
    exec((err, docs) => {
        if (err) {
            res.status(500).json({msn: "Error en el servidor"});
            return;
        }
        res.status(200).json(docs);
        return;
    });
  });
  router.post("/sendimg",(req, res) => {
    console.log(req.files);
    console.log(__dirname);
    var img = req.files.foto;
    var path = __dirname.replace(/\/routes/g, "/img");
    var date = new Date();
    var sing  = sha1(date.toString()).substr(1, 5);
    var totalpath = path + "/" + sing + "_" + img.name.replace(/\s/g,"_");
    console.log("totalpath " + totalpath);
    img.mv(totalpath, async(err) => {
        if (err) {
            return res.status(300).send({msn : "Error al escribir el archivo en el disco duro"});
        }
        console.log("totalpath " + totalpath);
        var obj = {};
        obj["foto"] = totalpath;
        var restaurant = new RESTAURANT(obj);
        console.log("hasta aqui llege ");
        restaurant.save((err, docs) => {
            if (err) {
                res.status(500).json({msn: "ERROR "})
                return;
            }
            res.status(200).json({name: img.name});
        });
    });
});
module.exports = router;