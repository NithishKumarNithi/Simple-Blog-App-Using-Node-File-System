var express = require("express");
var confirmRoutes = express.Router();
var handler = require("../handler");

confirmRoutes.get('/',function(req,res){
  res.send('confirm');
});


confirmRoutes.post('/delete',function(req,res){
  handler.deleteFile(req.body.post);
  res.send("File Deleted");
  
});

confirmRoutes.post('/update',function(req,res){
  handler.postData(req.body);
  res.send("Received Submitted Data");
});


module.exports = confirmRoutes;