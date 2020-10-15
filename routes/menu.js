var express = require('express');
var router = express.Router();
var MENU = require("../database/menu");
const multer=require("multer");
const { compile } = require('morgan');
  var storage1 = multer.diskStorage({
          destination: "./public/menu",
          filename: function(req,file,cb){
              console.log("---------------------");
              console.log(file);
              cb(null, file.originalname + "-" + Date.now() + ".jpg");
          }
      });
      var upload=multer({
          storage: storage1
      }).single("img");
      router.post("/sendmenu", (req, res)=>{
          var url=req.url;
          var id = url.split("/")[2];
          upload(req, res, (err)=>{
              if(err){
                  res.status(500).json({
                      "msn": "No se ha podido subir la imagen"
                  });
              }else{
                var ruta=req.file.path.substr(6, req.file.path.length);
                  console.log("ruta "+ruta);
                  var img ={
                    idmenu: id,
                    name : req.file.originalname,
                    physicalpath: req.file.path,
                    relativepath: "http://localhost:27017"+ruta
                };
                  var imgData = new MENU(img);
                  console.log("imgData"+imgData);
                  imgData.save().then((infoimg)=>{
                      var menu ={
                          gallery: new Array()
                      }
                      Menu.findOne({_id:id}).exec((err,docs)=>{
                          var data = docs.gallery;
                          var aux = new Array();
                          if(data.length == 1 && data [0] == ""){
                              menu.gallery.push("http://172.24.0.2:27017/api/1.0/sendmenu" + infoimg._id)
                          }else{
                              aux.push("http://172.24.0.2:27017/api/1.0/sendmenu" + infoimg._id);
                              data=data.concat(aux);
                              menu.gallery=data;
                          }
                          Menu.findOneAndUpdate({_id : id},menu,(err, params)=>{
                              if(err){
                                  res.status(500).json({
                                      "msm": "error en la actualizacion"
                                  });
                                  return;
                              }
                              res.status(200).json(req.file);
                          });
                          return;
                      })
                  });
              }
          });
      });
    module.exports = router;