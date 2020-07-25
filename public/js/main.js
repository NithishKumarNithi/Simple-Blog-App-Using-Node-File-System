(function(){
// date picker initialing

var dateFormat = {
  format: 'dd-mm-yyyy',
}

$('[data-toggle="datepicker"]').datepicker(dateFormat);

// application client side functionalities

function getRequestedElementById(idname){
  var idSelector = "#"+idname;
  return document.querySelector(idSelector);
}

/*
  windows variables
*/

var hostName = window.location.origin;

// Application Variables

var titleInp = getRequestedElementById("rm-form-title");
var dateInp = getRequestedElementById("rm-form-calender");
var textareaInp = getRequestedElementById("rm-form-textarea");
var titleInpError = getRequestedElementById("rm-error-title");
var dateInpError = getRequestedElementById("rm-error-calender");
var textareaInpError = getRequestedElementById("rm-error-textarea");
var submitInpBtn = getRequestedElementById("rm-form-submit-btn");
var errorFields = document.querySelectorAll('.rm-error');
var inpFields = document.querySelectorAll(".rm-inp-form-fields");
var userPostElementWrap = document.querySelector('.rm-userposts');
var confirmBtn = getRequestedElementById("rm-form-confrim-btn");
var updateBtn = getRequestedElementById("rm-form-update-btn");

// Event Listeners

if(submitInpBtn) submitInpBtn.addEventListener('click',formSubmit);
if(updateBtn) updateBtn.addEventListener('click',formUpdate);
if(confirmBtn) confirmBtn.addEventListener('click',formdelete);

window.onload = function(){
  var getUrl = hostName+"/datas";
  if (this.location.pathname == "/") ajaxGetRequest(getUrl,userPosts);
  if (this.location.pathname == "/update/") removeAttrDisable();
}


function userPosts(userdatas){
  var userDataObj = userdatas.readFileJson;
  
  userDataObj.forEach(function(userdata){
    var parseUserData = JSON.parse(userdata);
    var editLink = editLinkUrl(parseUserData);
    var strMinLen = 180;
    var userPostWrapperEle = document.createElement('div');
    userPostWrapperEle.classList.add('rm-userposts-wrap');
    
    var limitPostData = parseUserData.description.length > strMinLen ?  parseUserData.description.substr(0,strMinLen).concat(" ...") : parseUserData.description ;

    var appendUserPost = `

            <div class="rm-userpost-post-content">
              <h1 class="rm-userpost-title rm-userpost-content">${parseUserData.title}</h1>
              <div class="rm-userpost-description rm-userpost-content">
                <p class="rm-userpost-description-in">${limitPostData}
                </p>
              </div>
            </div>

            <div class="rm-userpost-post-content-info">
              <div class="rm-userpost-bottom-flex">
                <div class="rm-userpost-created-on">Created On : ${parseUserData.date}</div>
                <div class="rm-userpost-edit-icons">
                  
                  <span class="rm-userpost-update">
                    <a href="/update/?post=${editLink}" class="rm-userpost-update-link rm-userpost-edit-icons-links"><i class="far fa-edit"></i></a>
                  </span>
                  
                  <span class="rm-userpost-delete">
                    <a href="/delete/?post=${editLink}" class="rm-userpost-delete-link rm-userpost-edit-icons-links"><i class="far fa-trash-alt"></i></a>
                  </span>
                  
                  <span class="rm-userpost-view">
                    <a href="/view/?post=${editLink}" class="rm-userpost-view-link rm-userpost-edit-icons-links"><i class="far fa-eye"></i></a>
                  </span>
                  
                </div>
              </div>
            </div>
       
    `
    userPostWrapperEle.innerHTML = appendUserPost;
    userPostElementWrap.appendChild(userPostWrapperEle);
  });

}

// Event Handlers

function formSubmit(e){
  e.preventDefault();

  if(titleInp.value == "" || dateInp.value == "" || textareaInp.value ==""){
    errorFields.forEach(function(errs){
      errs.classList.remove("rm-hide");
      errs.classList.add("rm-show");
      errs.innerText = "* Fields required to be filled";
    })
  }

  if(titleInp.value != "") clearError(titleInpError);
  if(dateInp.value != "") clearError(dateInpError);
  if(textareaInp.value != "") clearError(textareaInpError);

  if(titleInp.value != "" &&  dateInp.value != "" && textareaInp.value != ""){
    var remainderPost = {};
    remainderPost.title = titleInp.value;
    remainderPost.date = dateInp.value;
    remainderPost.description = textareaInp.value;

    var jsonStringifiedPost = JSON.stringify(remainderPost);
    var postUrl = hostName+"/create/submit";
    ajaxPostRequest(postUrl,jsonStringifiedPost);

  }

  
  if(titleInp.value != "" &&  dateInp.value != "" && textareaInp.value != "") clearFieldsValue();

}

function formUpdate(e){
  e.preventDefault();

  if(titleInp.value == "" || dateInp.value == "" || textareaInp.value ==""){
    errorFields.forEach(function(errs){
      errs.classList.remove("rm-hide");
      errs.classList.add("rm-show");
      errs.innerText = "* Fields required to be filled";
    })
  }

  if(titleInp.value != "") clearError(titleInpError);
  if(dateInp.value != "") clearError(dateInpError);
  if(textareaInp.value != "") clearError(textareaInpError);

  if(titleInp.value != "" &&  dateInp.value != "" && textareaInp.value != ""){
    var remainderPost = {};
    remainderPost.title = titleInp.value;
    remainderPost.date = dateInp.value;
    remainderPost.description = textareaInp.value;
  }

  var jsonUpdateStringifiedPost = JSON.stringify(remainderPost);
  var postUpdateUrl = hostName+"/create/submit";
  ajaxPostRequest(postUpdateUrl,jsonUpdateStringifiedPost);
}



function formdelete(e){
  e.preventDefault();

  var deletePostUrl = hostName+"/confirm/delete";

  if(this.hasAttribute("data-filename")){
    var delPostFileName = this.getAttribute("data-filename");
  }
  
  var delPostDataStr = JSON.stringify({ post : delPostFileName });
  ajaxPostRequest(deletePostUrl,delPostDataStr);
}

// Clear Error Elements

function clearError(errEle){
  if(errEle.classList.contains("rm-show")){
    errEle.classList.remove("rm-show");
    errEle.classList.add("rm-hide");
    errEle.innerText = "";
  }
}

// Clear Fields Value

function clearFieldsValue(){
  titleInp.value = "";
  dateInp.value = "";
  textareaInp.value = "";
} 

// Remove Disabled Attr

function removeAttrDisable(){
  inpFields.forEach(function(inp){
    if(inp.hasAttribute("disabled")){
      inp.removeAttribute("disabled");
    }
  })
}

// Created Xhr object

var xhr = new XMLHttpRequest();

// AJAX Post Request

function ajaxPostRequest(url,postDataObj){
  xhr.open("POST",url,true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  }
  xhr.send(postDataObj);
}

// AJAX Get Request

function ajaxGetRequest(url,callback){
  xhr.open("GET",url,true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      callback(JSON.parse(this.responseText));
    }
  }
  xhr.send();
}

// Generate Edit Links

function editLinkUrl(filedata){
  var postDate = filedata.date;
  var splitPostDate = postDate.split("-");
  var editUrl = [splitPostDate[2],splitPostDate[1],postDate].join("/");

  return editUrl;
}

})();