var videoName = "";
var Encode = "";
var Id=0;
var _videoThumbnail="";


const GridviewMaHangLoad = () => {
  var url = "/api/wacoal_VideoLoadWeb_V1";
  // console.log(" url " + url + oderNo+khachHang);
  var VideoList = DevExpress.data.AspNet.createStore({
    key: "ID",
    loadUrl: url,
    // insertUrl: url + "/InsertOrder",
    // updateUrl: url + "/UpdateOrder",
    // deleteUrl: url + "/DeleteOrder",
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.xhrFields = {
        withCredentials: true,
      };
    },
  });

  // console.log("VideoList " + VideoList);

  $("#VideoGrid")
    .dxDataGrid({
      dataSource: VideoList,
      // reshapeOnPush: true,
      columnsAutoWidth: true,
      // height: 650,
      allowColumnReordering: true,
      rowAlternationEnabled: true,
      showColumnLines: true,
      showRowLines: true,
      showBorders: true,
      // export:{
      //     enabled: true
      // },

      focusedRowEnabled: true,
      scrolling: {
        mode: "virtual",
      },
      columnFixing: {
        enabled: true,
      },
      //phan trang
      // paging: {
      //     pageSize: 10
      // },
      
      searchPanel: {
        visible: true,
        // width: 80,
        highlightCaseSensitive: true,
      },
      headerFilter: {
        visible: true,
      },
      columns: [
        {
          caption: "Stt",
          alignment: "left",
          dataField: "Stt",
          width: 50,
          fixed: true,
        },
        {
          caption: "Tên Video",
          alignment: "left",
          dataField: "VideoName",
        },
        {
          caption: "Encode",
          alignment: "left",
          dataField: "ENCODE",
          visible: false,
        },{
            caption:"Id",
            alignment:"left",
            dataField:"ID",
            visible:false,
        },
        {
          caption:"videoThumbnail",
          alignment:"left",
          dataField:"videoThumbnail",
          visible:false
        }


      ],
      onFocusedRowChanged(e) {
        const videoItem = getVideoDataItem(e.row);
        videoName = videoItem.videoname;
        Encode = videoItem.Encode;
        Id=videoItem.Id;
        _videoThumbnail=videoItem.videoThumbnail;
      },
      onToolbarPreparing: function (e) {
        e.toolbarOptions.items.unshift(
          // {
          //   location: "alter",
          //   template: function () {
          //     return $("<div/>")
          //       .addClass("informer")
          //       .append(
          //         `
          //                <form action="/video/videolist" method="POST" enctype="multipart/form-data" id="frmUpload">
          //                <input type="file" name="filename" id="filename" />
          //                </from>
          //                `
          //       );
          //   },
          // },
          {
            location: "alter",
            widget: "dxButton",
            options: {
              icon: "upload",
              text: "",
              onInitialized: function (e) {
                e.element.attr("id", "btnUpload");
              },
              onClick: function () {
                window.location.reload();
              },
            },
          },
          {
            location: "after",
            widget: "dxButton",
            options: {
              icon: "edit",
              text: "",
              onInitialized: function (e) {
                e.element.attr("id", "btnEdit");
              },
              onClick: function () {
                EditForm();
              },
            },
          },
          {
            location: "aflter",
            widget: "dxButton",
            options: {
              icon: "remove",
              text: "",
              onInitialized: function (e) {
                e.element.attr("id", "btnDelete");
              },
              onClick: function () {
                if (!confirm("Bạn muốn xóa vide " + videoName)) {
                } else {
              
                  deleteData();
                 
                }
              },
            },
          },
          {
            location: "after",
            widget: "dxButton",
            options: {
              icon: "video",
              text: "",
              onInitialized: function (e) {
                e.element.attr("id", "btnVideo");
              },
              onClick: function () {
                VideoPlay();
              },
            },
          },
          {
            location: "after",
            widget: "dxButton",
            options: {
              icon: "fa fa-qrcode",
              text: "",
              onInitialized: function (e) {
                e.element.attr("id", "btnQrGenerate");
              },
              onClick: function () {
                GeneratorQRCode();
              },
            },
          },
 
        );
      },

      // }
    })
    .dxDataGrid("instance");
};

function deleteData() {

  const data = {
    Id: Id,
    Encode:Encode,
    videoThumbnail: _videoThumbnail
  };
  $.ajax({
      type:"POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url:"/video/deletedata",
      success: (res) =>{
          if(res.status){
            DevExpress.ui.notify(
                {
                  message: res.mes+ videoName,
                  width: 450,
                },
                "success",
                5000
              );
              GridviewMaHangLoad();

          }else{
            DevExpress.ui.notify(
                {
                  message: "failed: "+res.nes,
                  width: 450,
                },
                "error",
                5000
              );

          }
      }
  })

}

function EditForm  () {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitEdit");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtTenVideo').focus();
        }) 
        $('#txtTenVideo').val(videoName);
}

function Savedata(){
    var txtTenVideo= document.getElementById("txtTenVideo");
    var sTenVideoNew=txtTenVideo.value
      const  data={
            Id:Id,
            Videoname:sTenVideoNew
        };

        $.ajax({
            type:"POST",
            data:JSON.stringify(data),
            contentType:"application/json",
            url:"/video/videoedit",
            success:(res) =>{
                if(res.status){
                    DevExpress.ui.notify(
                        {
                            message:res.mes,
                            width:450
                        },
                        "success",
                        5000
                    )
                    GridviewMaHangLoad();
                    $("#modalAddUpdate").modal("hide");
                    videoName=sTenVideoNew;

                }else{
                    DevExpress.ui.notify(
                        {
                            message:res.mes,
                            width:450
                        },
                        "error",
                        5000
                    )
                    

                }
            }
        })

  
}

function GeneratorQRCode() {
  let hrefVideo =
    document.location.origin + "/video/videoplay?videoName=" + Encode;
  const data = {
    hrefVideo: hrefVideo,
  };

  $.ajax({
    type: "POST",
    data: JSON.stringify(data),
    //   data:formData,
    contentType: "application/json",
    // contentType:false ,
    url: "/video/videogenerateQRCode",
    // cache: false,
    // processData:false,
    success: (res) => {
      if (res) {
        DevExpress.ui.notify(
          {
            message: "success",
            width: 450,
          },
          "success",
          5000
        );

        window.location =
          document.location.origin +
          "/video/videogenerateQRCode?videoname=" +
          videoName;
      } else {
        DevExpress.ui.notify(
          {
            message: "failed",
            width: 450,
          },
          "error",
          5000
        );
        console.log(res);
      }
    },
  });
}

function getVideoDataItem(row) {
  const rowData = row && row.data;
  const videoItem = {
      Id:0,
    videoname: "",
    Encode: "",
    videoThumbnail:""
  };
  if (rowData) {
    (videoItem.videoname = rowData.VideoName),
      (videoItem.Encode = rowData.ENCODE),
      videoItem.Id=rowData.ID,
      videoItem.videoThumbnail=rowData.videoThumbnail
  }
  return videoItem;
}

function VideoPlay() {
  let hrefVideo =
    document.location.origin + "/video/videoplay?videoName=" + Encode;
    document.location = hrefVideo;
  // console.log(hrefVideo);
}

// const upload = () => {
//     // var ds = $("#VideoGrid").dxDataGrid("getDataSource")._items;
//   let formData = new FormData(document.getElementById("frmUpload"));

//   let fileName = $("#filename").val();
//   var extension = fileName.split(".").pop().toUpperCase();
//   var a = $.inArray(extension, [
//     "AVI",
//     "MP4",
//     "MKV",
//     "WMV",
//     "VOB",
//     "FLV",
//     "DIvX",
//   ]);

//   if (a == -1) {
//     DevExpress.ui.notify(
//       {
//         message: " file video không hợp lệ",
//         width: 450,
//       },
//       "warning",
//       5000
//     );
//     return;
//   }

//   //   let data ={
//   //     fileName:fileName
//   //   }
//   if (fileName === "") {
//     DevExpress.ui.notify(
//       {
//         message: "Chọn file trước khi nhập",
//         width: 450,
//       },
//       "warning",
//       5000
//     );
//   } else {
//     console.log(fileName);
//     $.ajax({
//       type: "POST",
//       //   data:JSON.stringify(data),
//       data: formData,
//       // contentType:"multipart/form-data" ,
//       contentType: false,
//       url: "/video/videolist",
//       cache: false,
//       processData: false,
//       success: (res) => {
//         if (res.statusErr) {
//           DevExpress.ui.notify(
//             {
//               message: res.errMes,
//               width: 450,
//             },
//             "success",
//             5000
//           );


//           GridviewMaHangLoad();
//         } else {
//           DevExpress.ui.notify(
//             {
//               message: res.errMes,
//               width: 450,
//             },
//             "error",
//             5000
//           );
//         }
//       },
//     });
//   }
// };

const loadTooltip = (id, targetButton) => {
  $(`#${id}`).dxTooltip({
    target: `#${targetButton}`,
    showEvent: "mouseenter",
    hideEvent: "mouseleave",
    closeOnOutsideClick: false,
  });
};

const form = document.getElementById("frmUpload"),
fileInput=form.querySelector(".file-input"),
processArea= document.querySelector(".process-area");
uploadedArea=document.querySelector(".uploaded-area");


function uploadFile(name) {
  let xhr= new XMLHttpRequest();
  xhr.open("POST",'/video/videolist');

  xhr.upload.addEventListener("progress",({loaded,total})=>{
      // console.log(loaded,total);
    let fileLoaded = Math.floor( (loaded/total) * 100);
    let fileTotal = Math.floor( total / 1000);
    let fileSize;
    (fileTotal<1024)? fileSize= fileTotal +' KB':fileSize =(loaded/(1024*1024)).toFixed(2)+' MB'
    let processHTML= ` <li class="row">
                          <i class="fa fa-file-video-o"></i>
                          <div class="content">
                              <div class="details">
                                  <span class="name">${name} - uploading</span>
                                  <span class="percent">${fileLoaded}</span>
                              </div>
                              <div class="process-bar">
                                  <div class="progress" style="width: ${fileLoaded}%"></div>

                              </div>
                          </div>
                      </li>
                   `;
 
      processArea.innerHTML = processHTML
      if(loaded == total){
          processArea.innerHTML = ''
           let uploadedHTML= `    <li class="row">
                          <div class="content">
                              <i class="fa fa-file-video-o"></i>
                              <div class="details">
                                  <span class="name">${name} - Uploaded</span>
                                  <span class="size">${fileSize}</span>
                              </div>
                          </div>
                          <i class="fa fa-check"></i>
                      </li>
                  `
                  uploadedArea.innerHTML =  uploadedHTML  + uploadedArea.innerHTML;   
                  // window.location.reload();
                 
          // uploadedArea.insertAdjacentHTML("alterbegin", uploadedHTML);
      }
  })
  xhr.addEventListener('error', ()=>{
    uploadedArea.innerHTML=''
  DevExpress.ui.notify(
    {
      message: "failed",
      width: 450,
    },
    "error",
    5000
  );
});
  let formData=new FormData(form);
  xhr.send(formData);
  
}

form.addEventListener("click",()=>{
  fileInput.click();

  fileInput.onchange = ({target}) =>{
      // console.log(target.files);
      //gettimg file and [0] this means if user has selected multiples files 
      // then get
      let file= target.files[0];
      if(file){//if file is selected
          let fileName=file.name;
          let filetType= file.type;
          if( filetType != "video/mp4" ){
            DevExpress.ui.notify(
              {
                message: " file video không hợp lệ",
                width: 450,
              },
              "warning",
              5000
            );
            return;

          }
          // if(filetStyle == )
          
          if( fileName.length >=12){ 
              // neu file nam qua dai thi cat bot di va the hien ...
              let splitName= fileName.split('.');
              fileName = splitName[splitName.length-2].substring(0,12) + "... ."+splitName[splitName.length-1];
          }
          uploadFile(fileName);
      }
  }
})



$(function () {

  GridviewMaHangLoad();
  loadTooltip("tooltipUpload", "btnUpload");
  loadTooltip("tooltipEdit", "btnEdit");
  loadTooltip("tooltipDelete", "btnDelete");
  loadTooltip("tooltipPlay", "btnVideo");
  loadTooltip("tooltipQRGenerate", "btnQrGenerate");
  var btnSave = document.getElementById("btnSave");
  btnSave.addEventListener("click", function(){
      Savedata();
  })

  window.addEventListener('resize',function() {
    if(window.innerWidth<700){
      $("#VideoGrid")
    .dxDataGrid({
      searchPanel:{
        visible:true,
        width: 80
      }
    }).dxDataGrid("instance");
    
  } else {
    $("#VideoGrid")
    .dxDataGrid({
      searchPanel:{
        visible:true,
        width: 160
      }
    }).dxDataGrid("instance");

  }
})

});
