var express = require("express");
var routes = require("./routes/create")

var exp = express();
var port = 1996;

var app = {};


// application middleware
app.applicationMiddleware = function(){

  var appMidware = {};

  // serving static file from public dir
  appMidware.renderStatic = function(){
    exp.use(express.static('public'));
    exp.use('/create',routes)
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
    res.render('login', { title : "Social App"} );
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



