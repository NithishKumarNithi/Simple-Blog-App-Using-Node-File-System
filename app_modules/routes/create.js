var express = require("express");
var routes = express.Router();

routes.get('/',function(req,res){
  res.render('create', { title : "Social App - Create"} );
});


module.exports = routes;