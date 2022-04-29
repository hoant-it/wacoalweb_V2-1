

var hrefVideoPath=window.location.origin+'/video/videoplay?videoName=';
var videoThumbnailPath='/video/thumbnails/'
var videoUserPath='/images/'
var videoChannelPath='/video/c/'
var static= new Static();

function  LoadVideo(arrData) {

    var videoSection = document.getElementById("videoSection");
    var arrDataStr = arrData.map((item) => {
      return `<article class="video-container"> 
              <a href=${hrefVideoPath}${item.enCode} class="thumbnail"
              data-duration=${item.videoDuration}>
                  <img class="thumbnail-image" src=${videoThumbnailPath}${item.videoThumbnail} alt="" >
              </a>
              <div class="video-bottom-section">
                  
                  <div class="video-details">
                      <a href="${hrefVideoPath}${item.enCode}" class="video-title"> ${item.videoName}</a>
                      <a href=${videoChannelPath}${item.userCreate} class="video-chanel-name">${item.fullName}</a>
                      <div class="video-metadata">
                          <span>${item.videoView}</span>
                          -
                          <span>${item.videoTime.toLowerCase()}</span>
                      </div>
                      <a href= ${videoChannelPath}${item.userCreate}>
                      <img class="channel-icon" src= ${videoUserPath}${item.userNameImagePath} alt="">
                  </a>
                  </div>
              </div>
          </article>`;
    });

    console.log(arrDataStr);


   
    videoSection.innerHTML = arrDataStr.join("");
  }


  function renderVideo(sSearch) {

    $.ajax({
      url:"wacoal_VideoHomeLoad_web_V1/"+sSearch+"",
      type:"GET",
      success: (res)=>{
      var  arrData=  res.data.htmt;
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
    window.location=location.origin+`/video/videosearch?v=${sSearch}`
    // renderVideo(sSearch);
  }

  function menuToggle(){
    const toggleMenu= document.getElementById("menuProfileId");
    toggleMenu.classList.toggle('active')
}

$(function() {
  
var sSearch=unescape(static.GetURLParameter("v")); 
$("#txtSearch").val(sSearch==="none"?"":sSearch);
  renderVideo(sSearch);

  // var btnSearch = document.getElementById("btnSearch");
  // btnSearch.addEventListener("click", Search)
  
  // txtSearch.addEventListener("keydown",function (e) {
  //   // console.log(e);
  //   if(e.code==='Enter'){
  //     var sSearch=txtSearch.value===""?"none":txtSearch.value;
  //     window.location=location.origin+`/video/videosearch?v=${sSearch}`
      
  //     // renderVideo(sSearch);
  //   }
    
  // })
});


