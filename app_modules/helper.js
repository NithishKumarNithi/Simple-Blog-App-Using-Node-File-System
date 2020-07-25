var fs = require("fs");
var config = require("../config");
var path = require("path");

var file = {};
var ext = config.userFileExt;

file.read = function(filename){

  /***
   * read files
  ***/

  try{
    var readFiles = fs.readFileSync(filename,"utf-8");
    return readFiles;
  }catch(err){
    console.log("file is missing");
  }

}

file.write = function(filename,filedata){

  /***
   * write files
  ***/

  filedata = filedata == undefined ? "" : JSON.stringify(filedata,null,"\t");

  fs.writeFile(filename+ext,filedata,function(err){

    if(err) console.log("Error while creating file");
    if(!err){
      console.log("File created successfully");
    }
    
  });

}

file.delete = function(filename){

  /***
   * delete files
  ***/

  fs.unlink(filename,function(err){
    if(err) console.log("Eitheir file name error or doesn't exit");
    if(!err) console.log("File is deleted");
  });

}
 
file.absolutePath = function(rootdir,dirnameobj,filename){

  /***
   * returns absolute path 
  ***/

  var pathDirs = file.constructPath(dirnameobj);
  filename = filename != undefined ? filename : "";

  return path.join(rootdir,pathDirs,filename);

}

file.constructPath = function(fileobj){

  /***
   * returns absolute path 
  ***/

  var arr = fileobj !== undefined ? Object.values(fileobj) : [];
  if(arr.length == 0) return "";
  if(arr.length != 0) return arr.join(path.sep) ;
  

}

file.months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

file.getFilesAndFoldersNames = function(parentFolder,folder,folderFile){

  /***
   * generate & returns files,folder name 
  ***/

  var date = new Date();
  var monthArr = file.months;

  var generateNamesForFiles = {};
  
  generateNamesForFiles.parentFolderName = parentFolder == undefined ? date.getUTCFullYear().toString() : parentFolder;
  generateNamesForFiles.folderName = folder == undefined ? monthArr[date.getUTCMonth()] : monthArr[folder];
  generateNamesForFiles.filesName =  folderFile == undefined ? date.toLocaleDateString().replace(/\//g,"-") : folderFile;

  return generateNamesForFiles;

}

file.dirArrs = [];

file.listDir = function(dirnames){

  /***
   * generate files list
  ***/

  function dirObj(dirnames){

    var dirFiles = fs.readdirSync(dirnames);

    dirFiles.forEach(function(f,index){
      
      var fpath = path.join(dirnames,f);
      var fileStat = fs.statSync(fpath);
      if(fileStat.isFile()){
        var indexOfUserDir = config.userDir+path.sep;
        var filePathSplit = fpath.substring(indexOfUserDir.length).split(path.sep);
        file.getFileTime(filePathSplit);
        file.dirArrs.push(filePathSplit);
      }
      if(fileStat.isDirectory()){
        dirObj(fpath); 
      }
    });

  }
  
  dirObj(dirnames); 

}

file.dirExists = function(directoryObj){

  /***
   * Checking for directory exists or else create directory
  ***/

  var dirobjToArr = Object.values(directoryObj);
  var folPath = config.userDir;

  dirobjToArr.forEach(function(dirs){
    dirCheckOrCreate(dirs);
  });

  function dirCheckOrCreate(folder){
    var dirPath = path.join(folPath,folder);

    try{
      fs.accessSync(dirPath);
      console.log("Directory Exists");
    }catch(err){
      console.log("Directory Doesn't Exist So Creating It");
      fs.mkdirSync(dirPath);
    }

    folPath = dirPath;
    
  }

}

file.getMonthIndex = function(filedate){

  /***
   * Return Month Index
  ***/

  var postDateArr = filedate.split("-");
  var postMonthValue = postDateArr[1].split("")[0] == 0 ? postDateArr[1].replace("0","") : postDateArr[1];

  return postMonthValue;
}

file.checkExits = function(filename){

  /***
   * Checking for file exists 
  ***/

  try{
    fs.accessSync(filename);
    return true;
  }catch(err){
    console.log("file Doesn't Exist ");
    return false;
  }

}


file.getFileTime = function(dirArr){

  var extractedDate = dirArr[2].split(".")[0].split("-");
  var revDateStr = extractedDate[2]+"-"+extractedDate[1]+"-"+extractedDate[0];
  var fileDate = new Date(revDateStr);
  // console.log(fileDate);
  // console.log(fileDate.getMilliseconds());

}


file.clear = function(){
  this.dirArrs = [];
}

module.exports = file;