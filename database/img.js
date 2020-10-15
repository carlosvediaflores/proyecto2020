var mongoose = require("./connect");
var IMG = {
    name: {type:String},
    physicalpath: {type:String},
    relativepath:{type:String}
};
var Img = mongoose.model("menu", IMG);
module.exports = Img;