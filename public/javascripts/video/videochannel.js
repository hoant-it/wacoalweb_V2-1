
var hrefVideoPath=window.location.origin+'/video/videoplay?videoName=';
var videoThumbnailPath='/video/thumbnails/'
var videoUserPath='/images/'

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
                  <a href=${item.userCreate}>
                      <img class="channel-icon" src= ${videoUserPath}${item.userNameImagePath} alt="">
                  </a>
                  <div class="video-details">
                      <a href="${hrefVideoPath}${item.enCode}" class="video-title"> ${item.videoName}</a>
                      <a href=${item.userCreate} class="video-chanel-name">${item.fullName}</a>
                      <div class="video-metadata">
                          <span>${item.videoView}</span>
                          -
                          <span>${item.videoTime.toLowerCase()}</span>
                      </div>
                  </div>
              </div>
          </article>`;
    });

    var htmlChannelInfo= `<img src="/images/user.png" alt="Wacoal Logo" class="wacoal-logo-channel">
                            <p>${arrData[0].fullName}</p>
                            `



    videoSection.innerHTML = arrDataStr.join("");
    channelInfo.innerHTML=htmlChannelInfo;
  }






  function showInputSearch(){
    btnSearchChannel.classList.toggle('hide');
    txtSearchChannel.classList.toggle('active');
    txtSearchChannel.focus();

  }
 

  function renderVideoChannel(userCreate){
    $.ajax({
        url:"wacoal_VideoChannelLoad_web_V1/"+userCreate+"",
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




$(function() {
  var userCreate=  window.location.pathname.split('/').pop();
    renderVideoChannel(userCreate);


  var txtSearchChannel= document.getElementById("txtSearchChannel");
  if(txtSearchChannel){
    txtSearchChannel.addEventListener("keydown",function (e) {
      if(e.code==='Enter'){
        // var sSearch=txtSearch.value===""?"none":txtSearch.value;
        var sSearch=txtSearchChannel.value
        if(sSearch===""){
          
        }else{
          var hrefnew=location.origin+location.pathname+ `/vcsearch?v=${sSearch}`
          window.location=hrefnew;
          // txtSearchChannel.classList.add('active');
        }
      
      }
    })

  }


  var btnSearchChannel= document.getElementById("btnSearchChannel");
  btnSearchChannel.addEventListener("click",showInputSearch)
});


