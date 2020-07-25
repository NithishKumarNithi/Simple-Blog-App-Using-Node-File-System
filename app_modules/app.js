var express = require("express");
var createRoutes = require("./routes/create");
var confirmRoutes = require("./routes/confirm");
var handler = require("./handler");



var exp = express();
var port = 1996;

var app = {};


// application middleware
app.applicationMiddleware = function(){

  var appMidware = {};

  // serving static file from public dir
  appMidware.renderStatic = function(){
    exp.use(express.static('public'));
    exp.use(express.urlencoded({ extended: true }));
    exp.use(express.json());
    exp.use('/create',createRoutes);
    exp.use('/confirm',confirmRoutes);
  }

  // serving html files from template dir
  appMidware.renderTemplateViews = function(){
    exp.set('views','./templates');
    exp.set('view engine', 'ejs');
  }

  appMidware.renderStatic();
  appMidware.renderTemplateViews();

}

// serving routes
app.applicationRoutes = function(){

  exp.get('/',function(req,res){
    res.render('index', { title : "Remainder"} );
  });

  exp.get('/datas',function(req,res){
    res.send(handler.getDataLists());
  });

  exp.get('/delete',function(req,res){
    var delData = handler.getRequestFileData(req.query.post);
    res.render("edit",{ 
      title : "Remainder-Delete", 
      fileContent : delData , 
      fileReqDel : req.query.post, 
      fileReqUp : false 
    });
  });

  exp.get('/update',function(req,res){
    var upData = handler.getRequestFileData(req.query.post);
    res.render("edit",{
      title : "Remainder-Update", 
      fileContent : upData , 
      fileReqDel : false, 
      fileReqUp : req.query.post 
    });
  });

  exp.get('/view',function(req,res){
    var viewData = handler.getRequestFileData(req.query.post);
    res.render("edit",{ 
      title : "Remainder-View",
      fileContent : viewData ,
      fileReqDel : false,
      fileReqUp : false
    });
  });

}

// application initiate
app.init = function(){

  this.applicationMiddleware();

  this.applicationRoutes();

  exp.listen(port,function(){
    console.log("\x1b[33m%s\x1b[0m","social-app is running on port " + port);
  });

}

module.exports = app;



