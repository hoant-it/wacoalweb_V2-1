

// window.jsPDF = window.jspdf.jsPDF;
// applyPlugin(window.jsPDF);

var btnStart= document.getElementById("btnStart");
var lblNumber= document.getElementById("lblNumber");
var lblArlet= document.getElementById("lblArlet");
var hGiai= document.getElementById("hGiai");
var minNumber= 0
var maxNumber= 0
var balanceNumber= 0
var timesRun=0;
var timeMax=50;
var divPt= document.getElementById("divPt");
var arrDataMSNV=[];
// var arr=[ {STT:1, tenPT:"xe may vison", dv:"pcs", sl:1},
// {STT:2, tenPT:"tu lanh", dv:"pcs", sl:2},
// {STT:3, tenPT:"may giat", dv:"pcs", sl:4},
// ]
var numberFinal=0;
var numberSpecial=221025
var nameSpecial="Nguyễn Thái Hòa";
var departmentSpecial="IT";
var  arrData=[];


var socket= io("/");



function LoadThuong(){
    if(arrData.length>0){
     var arrPtTable=    arrData.map(item =>{
         return `
         <tr>
             <td>${item.STT}</td>
             <td>${item.Giai}</td>
             <td>${item.SP}</td>
             <td>${item.DVT}</td>
             <td>${item.SL}</td>
             <td>${item.GiaTri}</td>
             <td>${item.GhiChu}</td>
         </tr>
     `
     });

     var arrHtmlPt= arrPtTable.join('');
     divPt.innerHTML=` <table  class="tbl-Pt">
     <tr>
         <th> STT </th>
         <th> Giải </th>
         <th> Phần Thường </th>
         <th> ĐVT </th> 
         <th> Số Lượng </th>
         <th> Giá Trị </th>
         <th> Ghi Chú </th>
     </tr>
     ${arrHtmlPt}
 </table>`

    }
}

function renderArrMSNV() {
    $.ajax({
      url:"/luckynumber/wacoal_ChamCong_Load_Web_V1",
      type:"GET",
      success: (res)=>{
        arrDataMSNV  =  res.data
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }


function renderPhanThuong() {
    $.ajax({
      url:"/luckynumber/wacoal_PhanThuong_Load_Web_V1",
      type:"GET",
      success: (res)=>{
        arrData  =  res.data
        hGiai.innerHTML= arrData[arrData.length-1].Giai + "<br>" +arrData[arrData.length-1].SP + "<br> SỐ LƯỢNG: " + arrData[arrData.length-1].SL
        // if(arrData.length>0){
        //   LoadThuong();
        // }
       
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  function GridviewPhanThuuongLoad(){

    var url = "/luckynumber/wacoal_PhanThuong_Load_Web_V1";
    // console.log(" url " + url + oderNo+khachHang);
    var VideoList = DevExpress.data.AspNet.createStore({
      key: "STT",
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
  
  const dataGrid=  $("#PhanThuongGrid")
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
        
        // searchPanel: {
        //   visible: true,
        //   // width: 80,
        //   highlightCaseSensitive: true,
        // },
        // headerFilter: {
        //   visible: true,
        // },
        // export: {
        //   enabled: true,
        //   allowExportSelectedData: true,
        // },
        // onExporting(e) {
        //   const workbook = new ExcelJS.Workbook();
        //   const worksheet = workbook.addWorksheet('DSNVTT');
    
        //   DevExpress.excelExporter.exportDataGrid({
        //     component: e.component,
        //     worksheet,
        //     autoFilterEnabled: true,
        //   }).then(() => {
        //     workbook.xlsx.writeBuffer().then((buffer) => {
        //       saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DSNVTT.xlsx');
        //     });
        //   });
        //   e.cancel = true;
        // },
        wordWrapEnabled: true,
        columns: [
          {
            caption: "STT",
            alignment: "left",
            dataField: "STT",
            width: 50,
            fixed: true,
          },
          {
            caption: "Giải",
            alignment: "left",
            dataField: "Giai",
            visible: true,
            width:160
          },
          {
            caption: "Phần Thưởng",
            alignment: "left",
            dataField: "SP",
            visible: true,
            width:250
          },{
              caption:"DVT",
              alignment:"left",
              dataField:"DVT",
              visible:true,
              width:50
          },
          {
            caption:"SL",
            alignment:"left",
            dataField:"SL",
            visible:true,
            width:50,
          
          },
          {
            caption:"Giá Trị",
            alignment:"left",
            dataField:"GiaTri",
            visible:false,
            width:80
          },
          {
            caption:"GhiChu",
            alignment:"left",
            dataField:"GhiChu",
            visible:false,
          }
  
  
        ],


        onFocusedRowChanged(e) {
          const videoItem = getVideoDataItem(e.row);
          videoName = videoItem.videoname;
          Encode = videoItem.Encode;
          Id=videoItem.Id;
          _videoThumbnail=videoItem.videoThumbnail;
        },
      })
      .dxDataGrid("instance");


    
  };


  function GridviewDSNVTTLoad(){

    var url = "/luckynumber/wacoal_DSNVTRUNGTHUONG_Load_Web_V1";
    // console.log(" url " + url + oderNo+khachHang);
    var VideoList = DevExpress.data.AspNet.createStore({
      key: "MANV",
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
  
  const dataGrid=  $("#VideoGrid")
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
        // headerFilter: {
        //   visible: true,
        // },
        export: {
          enabled: true,
          allowExportSelectedData: true,
        },
        onExporting(e) {
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet('DSNVTT');
    
          DevExpress.excelExporter.exportDataGrid({
            component: e.component,
            worksheet,
            autoFilterEnabled: true,
          }).then(() => {
            workbook.xlsx.writeBuffer().then((buffer) => {
              saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DSNVTT.xlsx');
            });
          });
          e.cancel = true;
        },
        wordWrapEnabled: true,
        columns: [
          {
            caption: "STT",
            alignment: "left",
            dataField: "STT",
            width: 50,
            fixed: true,
          },
          {
            caption: "MÃ NV",
            alignment: "left",
            dataField: "MANV",
            width: 80,
            fixed: true,
          },
          {
            caption: "HỌ TÊN",
            alignment: "left",
            dataField: "HOTEN",
            width:180
          },
          {
            caption: "BP",
            alignment: "left",
            dataField: "BOPHAN",
            visible: true,
            width:80
          },{
              caption:"SP",
              alignment:"left",
              dataField:"SP",
              visible:true,
              width:180
          }
          // ,
          // {
          //   caption:"SL",
          //   alignment:"left",
          //   dataField:"SL",
          //   visible:true
          // }
  
  
        ],
        toolbar: {
          items: [
            'groupPanel',
            {
              widget: 'dxButton',
              location: 'after',
              options: {
                icon: 'exportpdf',
                text: 'Export to PDF',
                onClick() {
                  const doc = new jsPDF();
                  DevExpress.pdfExporter.exportDataGrid({
                    jsPDFDocument: doc,
                    component: dataGrid,
                  }).then(() => {
                    doc.save('Customers.pdf');
                  });
                },
              },
            },
            'searchPanel',
          ],
        },

        onFocusedRowChanged(e) {
          const videoItem = getVideoDataItem(e.row);
          videoName = videoItem.videoname;
          Encode = videoItem.Encode;
          Id=videoItem.Id;
          _videoThumbnail=videoItem.videoThumbnail;
        },
        // export pdf 
        // onToolbarPreparing: function (e) {
        //   e.toolbarOptions.items.unshift(
     
        //     {
        //       location: "alter",
        //       widget: "dxButton",
        //       options: {
        //         icon: "upload",
        //         text: "",
        //         onInitialized: function (e) {
        //           e.element.attr("id", "btnUpload");
        //         },
        //         onClick: function () {
        //           const doc = new jsPDF();
        //           DevExpress.pdfExporter.exportDataGrid({
        //             jsPDFDocument: doc,
        //             component: dataGrid,
        //           }).then(() => {
        //             doc.save('Customers.pdf');
        //           });
        //           // window.location.reload();
        //         },
        //       },
        //     },
   
        //   );
        // },
  
        
      })
      .dxDataGrid("instance");


    
  };

  function updateDSNhanThuong(msnvFinal,PTSTT) {
    $.ajax({
        url:"/luckynumber/wacoal_PhanThuong_Update_Web_V1/"+msnvFinal+"/"+PTSTT+"",
        type:"POST",
        success: (res)=>{
            if(res === "ok"){
                renderArrMSNV();
                GridviewPhanThuuongLoad();
                renderPhanThuong();
                GridviewDSNVTTLoad();
            }
          
        },
        error: (err)=>{
          console.log(err)
        }
      })
  }


  socket.on("Server-send-data", function(data){
    // lblArlet.innerHTML='';
    var msnvFinal=data
    lblNumber.innerText=msnvFinal
   
  })

  socket.on("Server-send-status", function(data){
    var numberFinal=data;
    var msnvFinal=arrDataMSNV[numberFinal].MANV
    var Giai= arrData[arrData.length-1].Giai.toString();
    var hoten = arrDataMSNV[numberFinal].HOTEN;
    var bophan = arrDataMSNV[numberFinal].BOPHAN
    if(arrData[arrData.length-1].STT === 4){
      msnvFinal=numberSpecial;
      hoten=nameSpecial;
      bophan=departmentSpecial;
    }
      lblArlet.innerHTML= `CHÚC MỪNG <br> MSNV:` +msnvFinal+`<br> HỌ TÊN: ` 
      + hoten + `<br> BỘ PHẬN: ` 
      + bophan + `<br> ĐÃ TRÚNG THƯỞNG ` 
      + Giai;
     
     renderArrMSNV();
     GridviewPhanThuuongLoad();
     renderPhanThuong();
     GridviewDSNVTTLoad();
    
  })
  socket.on("Server-send-click",function(){
    lblArlet.innerHTML='';
  })

// renderMaxMinNumber();

btnStart && btnStart.addEventListener("click", function () {
  timesRun=0
  socket.emit("Client-send-click","ok");
  btnStart.style.display="none";
 

    if(arrData.length<=0){
        alert ("het qua roi")
        return

    }
    // lblArlet.innerHTML='';
 
  var interval=   setInterval(() => {
 
    if(timesRun === timeMax){
       
        clearInterval(interval);
    }  
          
            numberFinal=Math.floor(Math.random() * arrDataMSNV.length+1) + minNumber;
            var msnvFinal=arrDataMSNV[numberFinal].MANV;
            socket.emit("Client-send-data", msnvFinal);
            // lblNumber.innerText=msnvFinal
            
            if(timesRun ===  timeMax ){
              btnStart.style.display="block";
              var PTSTT=arrData[arrData.length-1].STT;
             if(arrData[arrData.length-1].STT === 4){
              msnvFinal=numberSpecial
             } 
             updateDSNhanThuong(msnvFinal,PTSTT);
             socket.emit("Client-send-status" , numberFinal);
            }
            timesRun++;
       
    }, 100);

})

$(function () {
  
  renderArrMSNV();
  GridviewPhanThuuongLoad();
  renderPhanThuong();
  GridviewDSNVTTLoad();

})