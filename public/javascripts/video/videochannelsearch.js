

var hrefVideoPath=window.location.origin+'/video/videoplay?videoName=';
var videoThumbnailPath='/video/thumbnails/'
var videoUserPath='/images/'
var videoChannelPath='/video/c/'
var static = new Static();

function  LoadVideo(arrData) {

    var videoSection = document.getElementById("videoSection");
    var channelInfo = document.getElementById("channelInfo");
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
    var htmlChannelInfo= `<img src="/images/user.png" alt="Wacoal Logo" class="wacoal-logo-channel">
                            <p>${arrData[0].fullName}</p>`

    // console.log(arrDataStr);


   
    videoSection.innerHTML = arrDataStr.join("");
    channelInfo.innerHTML=htmlChannelInfo;
    
  }




  function renderVideoChannel(sSearch) {

    $.ajax({
    //   url:"wacoal_VideoChannelLoad_Search_web_V1/"+sUserCreate+"/"+sSearch+"",
      url:"wacoal_VideoChannelLoad_Search_web_V1/"+sSearch+"",
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




  function SearchChannel() {
    var txtSearchChannel=document.getElementById("txtSearchChannel");
    var sSearch=txtSearchChannel.value;
    window.location=location.href+`/vcsearch?v=${sSearch}`
    renderVideoChannel(sSearch);
  }

//   function menuToggle(){
//     const toggleMenu= document.getElementById("menuProfileId");
//     toggleMenu.classList.toggle('active')
// }
function showInputSearch(){
  btnSearchChannel.classList.toggle('hide');
  txtSearchChannel.classList.toggle('active');
  txtSearchChannel.focus();

}

$(function() {

 var arrPath=   window.location.pathname.split('/');
 var sUserCreate= arrPath.splice(arrPath.length-2,1).toString();
  
var sSearch=unescape(static.GetURLParameter("v")); 
$("#txtSearchChannel").val(sSearch==="none"?"":sSearch);
renderVideoChannel(sSearch);

  var txtSearchChannel = document.getElementById("txtSearchChannel");
  // btnSearch.addEventListener("click", Search)
  
  txtSearchChannel.addEventListener("keydown",function (e) {
    // console.log(e);
    if(e.code==='Enter'){
      var sSearch=txtSearchChannel.value===""?"none":txtSearchChannel.value;
      window.location=location.pathname+`?v=${sSearch}`
      
      // renderVideo(sSearch);
    }
    
  })

  var btnSearchChannel= document.getElementById("btnSearchChannel");
  btnSearchChannel && btnSearchChannel.addEventListener("click",showInputSearch)
});


