var express = require("express");
var createRoutes = express.Router();
var handler = require("../handler");

createRoutes.get('/',function(req,res){
  res.render('create', { title : "Social App - Create"} );
});

createRoutes.post('/submit',function(req,res){
  handler.postData(req.body);
  res.send("Received Submitted Data");
});


module.exports = createRoutes;