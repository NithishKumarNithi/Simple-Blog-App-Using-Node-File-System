var fs = require("fs");
var config = require("../config");
var path = require("path");

var file = {};

file.read = function(filename){

  /***
   * read files
  ***/

 fs.readFile( dirPath+filename,"utf-8",function(err,str){

  if(err) console.log("file is missing");
  if(!err && str){
    console.log(str);
  }

 });

}

file.write = function(filename){

  /***
   * write files
  ***/

  // fs.writeFile()

  

}

file.update = function(filename){
  /***
   * update files
  ***/

  // fs.open()
}
 
file.delete = function(filename){

  /***
   * delete files
  ***/

  //  fs.unlink()
}
 
file.absolutePath = function(rootdir,dirname,filename){

  /***
   * returns absolute path 
  ***/

  return path.join(rootdir,dirname,filename);

}

file.constructPath = function(fileobj){

  /***
   * returns absolute path 
  ***/

  var arr = fileobj !== undefined ? Object.values(fileobj) : [];
  if(arr.length == 0) return "";
  if(arr.length != 0) return arr.join(path.sep) ;

}

file.getFilesAndFoldersNames = function(){

  /***
   * generate & returns files,folder name 
  ***/

  var date = new Date();
  var monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  var generateNamesForFiles = {};
  
  generateNamesForFiles.parentFolderName = date.getUTCFullYear().toString();
  generateNamesForFiles.folderName = monthArr[date.getUTCMonth()];
  generateNamesForFiles.filesName =  date.toLocaleDateString().replace(/\//g,"-");

  return generateNamesForFiles;

}
