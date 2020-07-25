var config = require("../config");
var helper = require("./helper");
var handle = {};

handle.postData = function(postDataObj){
  var postDate = postDataObj.date;
  var postDateSplit = postDate.split("-");
  var postMonth = helper.getMonthIndex(postDate);

  var dirsObj = {
    dir1: postDateSplit[2],
    dir2: helper.months[parseInt(postMonth) - 1]
  }

  helper.dirExists(dirsObj);

  var filePath = helper.absolutePath(config.userDir,dirsObj,postDate);
  helper.write(filePath,postDataObj);

}

handle.getDataLists = function(){
  var readJsonDataObj = {
    readFileJson : [] 
  }
  helper.clear();
  helper.listDir(config.userDir);
  var dirLists = helper.dirArrs;
  dirLists.forEach(function(dl,index){
    var dirObj = {
      dir1: dl[0],
      dir2: dl[1]
    }
    var readFileName = helper.absolutePath(config.userDir,dirObj,dl[2]);
    readJsonDataObj.readFileJson[index] = helper.read(readFileName);
    
  });
  return readJsonDataObj;
}

handle.getRequestedFile = function(fileRequest){
  var requestFile = fileRequest.split("/");
  var requestFileMonth = helper.getMonthIndex(requestFile[2]);

  var reqDirObj = {
    dir1: requestFile[0],
    dir2: helper.months[parseInt(requestFileMonth) - 1]
  }
  var requestFilePath = helper.absolutePath(config.userDir,reqDirObj,requestFile[2]+config.userFileExt);
  
  return requestFilePath;
   
}

handle.deleteFile = function(delFileRequest){
  var delFile = handle.getRequestedFile(delFileRequest);

  if(helper.checkExits(delFile)){
    helper.delete(delFile);
  }else{
    console.log(delFile + "Doesn't exist");
  }

}

handle.updateFile = function(upFileRequest){
  var upFile = handle.getRequestedFile(upFileRequest);

  if(helper.checkExits(upFile)){
    helper.write(upFile);
  }else{
    console.log(upFile + "Doesn't exist");
  }

}

handle.viewFile = function(viewFileRequest){
  var viewFile = handle.getRequestedFile(viewFileRequest);
  if(!helper.checkExits(viewFile)){
    console.log(viewFile + "Doesn't exist");
  }
}


handle.getRequestFileData = function(RequestedFileData){
  var reqFileData = handle.getRequestedFile(RequestedFileData);

  if(helper.checkExits(reqFileData))  return JSON.parse(helper.read(reqFileData));

  return false;
}

module.exports = handle;