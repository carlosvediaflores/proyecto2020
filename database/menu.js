var mongoose = require("./connect");
var MENUSCHEMA = {
    name: {type:String},
    physicalpath: {type:String},
    relativepath:{type:String}
};
var MENU = mongoose.model("menu", MENUSCHEMA);
module.exports = MENU;