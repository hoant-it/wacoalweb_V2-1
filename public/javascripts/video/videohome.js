
var hrefVideoPath=window.location.origin+'/video/videoplay?videoName=';
var videoThumbnailPath='/video/thumbnails/'
var videoUserPath='/images/'
var videoChannelPath='/video/c/'

function  LoadVideo(arrData) {
    var videoSection = document.getElementById("videoSection");
    var arrDataStr = arrData.map((item) => {
      return `<article class="video-container"> 
              <a href=${hrefVideoPath}${item.enCode} class="thumbnail"
              data-duration=${item.videoDuration}>
                  <img class="thumbnail-image" src=${videoThumbnailPath}${item.videoThumbnail} alt="" >
              </a>
              <div class="video-bottom-section">
                  <a href= ${videoChannelPath}${item.userCreate}>
                      <img class="channel-icon" src= ${videoUserPath}${item.userNameImagePath} alt="">
                  </a>
                  <div class="video-details">
                      <a href="${hrefVideoPath}${item.enCode}" class="video-title"> ${item.videoName}</a>
                      <a href=${videoChannelPath}${item.userCreate} class="video-chanel-name">${item.fullName}</a>
                      <div class="video-metadata">
                          <span>${item.videoView}</span>
                          -
                          <span>${item.videoTime.toLowerCase()}</span>
                      </div>
                  </div>
              </div>
          </article>`;
    });
    videoSection.innerHTML = arrDataStr.join("");
  }


  function renderVideo(sSearch) {
    $.ajax({
      url:"wacoal_VideoHomeLoad_web_V1/"+sSearch+"",
      type:"GET",
      success: (res)=>{
      var  arrData=  res.data
        LoadVideo(arrData);
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }


  function Search() {
    var txtSearch=document.getElementById("txtSearch");
    var sSearch=txtSearch.value;
    if(sSearch===""){
        
    }else{
      window.location=location.origin+`/video/videosearch?v=${sSearch}`
    }
      // window.location=location.origin+`/video/videosearch?v=${sSearch}`
    
   
    // renderVideo(sSearch);
  }



$(function() {

  renderVideo("none");
  var btnSearch = document.getElementById("btnSearch");
  btnSearch.addEventListener("click", Search)
  var txtSearch= document.getElementById("txtSearch");
  txtSearch.addEventListener("keydown",function (e) {
    if(e.code==='Enter'){
      // var sSearch=txtSearch.value===""?"none":txtSearch.value;
      var sSearch=txtSearch.value
      if(sSearch===""){
        
      }else{
        window.location=location.origin+`/video/videosearch?v=${sSearch}`
      }
    
    }
  })

 $("body").click(function (e) {

  console.log(e.target);

   if(e.target.getAttribute("class")==="has-submenu" ||
   $(e.target).parents(".has-submenu").length>0){
   
  }else{
    $('.submenu').hide();
  }
 })



$("li:has(ul)").click(function(){
  // $('.submenu').hide();
  if($(".submenu",this).css('display')=='none'){
    $('.submenu').hide();
    $(".submenu",this).show();
  }
  else{
    $(".submenu",this).hide();
  }
  });





});


