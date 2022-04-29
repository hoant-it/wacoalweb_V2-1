var MY='';

const OrderDraftGridLoad  = (MY) => {
    var url = "DONHANGITEM_DRAFT_Load_Web_V1/";
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        key: "ID",
        loadUrl: url  + MY ,
       
        // insertUrl: url + "/InsertOrder",
        // updateUrl: url + "/UpdateOrder",
        // deleteUrl: url + "/DeleteOrder",
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridOrderDraft").dxDataGrid({
        dataSource: listTinhChi,
        // reshapeOnPush: true,
        columnsAutoWidth: true,
        height: 450,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        export:{
            enabled: true
        },
        onExporting(e) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Order');
      
            DevExpress.excelExporter.exportDataGrid({
              component: e.component,
              worksheet,
              autoFilterEnabled: true,
            }).then(() => {
              workbook.xlsx.writeBuffer().then((buffer) => {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `Order_Draft_${MY}.xlsx`);
              });
            });
            e.cancel = true;
          },
        focusedRowEnabled: true,
        // rowDragging:{
        //     data: 1,
        //     group: "tasksGroup",
        //     onAdd: onAdd
        // },
        // filterRow: {
        //     visible: true,
        //     applyFilter: "auto"
        // },
        // remoteOperations: true,   
        // searchPanel: {
        //     visible: true,
        //     highlightCaseSensitive: true,
        //     // width: 240,
        //     // placeholder: "Search..."
        // },
        // headerFilter: {
        //     visible: false
        // },
        // groupPanel: {
        //     visible: false
        // },
        scrolling: {
            mode: "virtual"
        },
        //phan trang
        // paging: {
        //     pageSize: 10
        // },
        columns: [
            {
                caption: "STT",
                alignment:"left",
                dataField: "STT",
                visible: false
            },
            {
                caption: "Classification",
                alignment:"left",
                dataField: "Classification",
            },
            {
                caption: "OrderNo",
                alignment:"left",
                dataField: "OrderNo",
            },
            {
                caption: "UnitNo",
                alignment:"left",
                dataField: "UnitNo",
            },
            {
                caption: "Style",
                alignment:"left",
                dataField: "Style",
            },
            {
                caption: "Cup",
                alignment:"left",
                dataField: "Cup",
            },
            {
                caption: "Size",
                alignment:"left",
                dataField: "Size",
            },
            {
                caption: "Color",
                alignment:"left",
                dataField: "Color",
            },
            {
                caption: "OrderQty",
                alignment:"right",
                dataField: "OrderQty",
            },
            {
                caption: "Note",
                alignment:"right",
                dataField: "Note",
            },
            {
                caption: "MY",
                alignment:"left",
                dataField: "MY",
            },
            {
                caption: "TIMECREATE",
                alignment:"left",
                dataField: "TIMECREATE",
            },
            {
                caption: "USERCREATE",
                alignment:"left",
                dataField: "USERCREATE",
            },
            {
                caption: "TIMEUPDATE",
                alignment:"left",
                dataField: "TIMEUPDATE",
            },
            {
                caption: "USERUPDATE",
                alignment:"left",
                dataField: "USERUPDATE",
            },

          
           
        ],
        onToolbarPreparing: function(e){
            e.toolbarOptions.items.unshift({
                location:"alter",
                template:function(){
                    return $('<div/>')
                    .addClass("informer")
                        .append(
                         `
                         <form action="" method="POST" enctype="multipart/form-data" id="frmUploadOrderDraft">
                         <input type="file" name="filenameDraft" id="filenameDraft" />
                         </from>
                         `
                        );
                }

            },
            {
                location:"alter",
                widget:"dxButton",
                options:{
                    icon:"upload",
                    text:"",
                    onInitialized: function (e) {
                        e.element.attr("id", "btnUpload");
                    },
                    onClick: function (){
                        // console.log("clicker")
                        uploadDraft();
                    }
                }
            },
            {
                location: "alter",
                widget: "dxSelectBox",
           
                options: {
                    dataSource:DevExpress.data.AspNet.createStore({
                        key: "MY",
                        loadMode:"raw",
                        loadUrl:"DONHANGITEM_DRAFT_MY_SearchBox_Web_V1",
                    }),
                    placeholder: "Chọn Order *",

                    width: 200,
                    displayExpr: "MY",
                    valueExpr: "MY",
                    searchEnabled: true,
                    searchExpr:'MY',
                    searchMode:'contains',
                    searchTimeout:200,
                    minSearchLength:0,
                    showDataBeforeSearch:false,
                    value:MY,
                    onInitialized: function (e) {
                        e.element.attr("id", "selectBoxMH");
                    },
                    onValueChanged: function(e) {
                        MY=e.value;
                        OrderDraftGridLoad(MY);
                    }
                }
            },
         
            )
        },
    }).dxDataGrid("instance");

}

const OrderGridLoad  = (MY) => {
    var url = "DONHANGITEM_3_Load_Web_V1/";
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        key: "ID",
        loadUrl: url  + MY ,
       
        // insertUrl: url + "/InsertOrder",
        // updateUrl: url + "/UpdateOrder",
        // deleteUrl: url + "/DeleteOrder",
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridOrder").dxDataGrid({
        dataSource: listTinhChi,
        // reshapeOnPush: true,
        columnsAutoWidth: true,
        height: 450,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        export:{
            enabled: true
        },
        onExporting(e) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Order');
      
            DevExpress.excelExporter.exportDataGrid({
              component: e.component,
              worksheet,
              autoFilterEnabled: true,
            }).then(() => {
              workbook.xlsx.writeBuffer().then((buffer) => {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `Order_${MY}.xlsx`);
              });
            });
            e.cancel = true;
          },
        focusedRowEnabled: true,
        // rowDragging:{
        //     data: 1,
        //     group: "tasksGroup",
        //     onAdd: onAdd
        // },
        // filterRow: {
        //     visible: true,
        //     applyFilter: "auto"
        // },
        // remoteOperations: true,   
        // searchPanel: {
        //     visible: true,
        //     highlightCaseSensitive: true,
        //     // width: 240,
        //     // placeholder: "Search..."
        // },
        // headerFilter: {
        //     visible: false
        // },
        // groupPanel: {
        //     visible: false
        // },
        scrolling: {
            mode: "virtual"
        },
        //phan trang
        // paging: {
        //     pageSize: 10
        // },
        columns: [
            {
                caption: "STT",
                alignment:"left",
                dataField: "STT",
                visible:false
            },
            {
                caption: "Classification",
                alignment:"left",
                dataField: "Classification",
            },
            {
                caption: "MY",
                alignment:"left",
                dataField: "MY",
            },
            {
                caption: "Order",
                alignment:"left",
                dataField: "OrderNo",
            },
            {
                caption: "UnitNo",
                alignment:"left",
                dataField: "UnitNo",
            },
            {
                caption: "Style",
                alignment:"left",
                dataField: "Style",
            },
            {
                caption: "Cup",
                alignment:"left",
                dataField: "Cup",
            },
            {
                caption: "Size",
                alignment:"left",
                dataField: "Size",
            },
            {
                caption: "Color",
                alignment:"left",
                dataField: "Color",
            },
            {
                caption: "OrderQty",
                alignment:"right",
                dataField: "OrderQty",
            },
            {
                caption: "Note",
                alignment:"right",
                dataField: "Note",
            },
          
           
        ],
        onToolbarPreparing: function(e){
            e.toolbarOptions.items.unshift({
                location:"alter",
                template:function(){
                    return $('<div/>')
                    .addClass("informer")
                        .append(
                         `
                         <form action="" method="POST" enctype="multipart/form-data" id="frmUpload">
                         <input type="file" name="filename" id="filename" />
                         </from>
                         `
                        );
                }

            },
            {
                location:"alter",
                widget:"dxButton",
                options:{
                    icon:"upload",
                    text:"",
                    onInitialized: function (e) {
                        e.element.attr("id", "btnUpload");
                    },
                    onClick: function (){
                        // console.log("clicker")
                       upload();
                    }
                }
            },
            {
                location: "alter",
                widget: "dxSelectBox",
           
                options: {
                    dataSource:DevExpress.data.AspNet.createStore({
                        key: "MY",
                        loadMode:"raw",
                        loadUrl:"DONHANGITEM_3_MY_SearchBox_Web_V1",
                    }),
                    placeholder: "Chọn Order *",

                    width: 200,
                    displayExpr: "MY",
                    valueExpr: "MY",
                    searchEnabled: true,
                    searchExpr:'MY',
                    searchMode:'contains',
                    searchTimeout:200,
                    minSearchLength:0,
                    showDataBeforeSearch:false,
                    value:MY,
                    onInitialized: function (e) {
                        e.element.attr("id", "selectBoxMH");
                    },
                    onValueChanged: function(e) {
                        MY=e.value;
                        OrderGridLoad(MY);
                    }
                }
            },
         
            )
        },
    }).dxDataGrid("instance");

}
const loadPanel = $('.loadpanel').dxLoadPanel({
    shadingColor: 'rgba(0,0,0,0.4)',
    position: { of: '#GridOrderDraft' },
    visible: false,
    showIndicator: true,
    showPane: true, 
    shading: false,//to den full man hinh
    closeOnOutsideClick: false,
    onShown() {
    //   setTimeout(() => {
    //     loadPanel.hide();
    //   }, 3000);
    },
    onHidden() {
        // GridviewMaHangLoad(MaHang);
        GridviewMauNLLoaiChiNewLoad();
        GridMHCDNewLoad();
    },
  }).dxLoadPanel('instance');

  const loadPanelCT = $('.loadpanelCT').dxLoadPanel({
    shadingColor: 'rgba(0,0,0,0.4)',
    position: { of: '#GridOrder' },
    visible: false,
    showIndicator: true,
    showPane: true, 
    shading: false,//to den full man hinh
    closeOnOutsideClick: false,
    onShown() {
    //   setTimeout(() => {
    //     loadPanel.hide();
    //   }, 3000);
    },
    onHidden() {
        // GridviewMaHangLoad(MaHang);
        GridviewMauNLLoaiChiNewLoad();
        GridMHCDNewLoad();
    },
  }).dxLoadPanel('instance');

const uploadDraft=()=>{
    loadPanel.show()
  let formData  =new FormData(document.getElementById("frmUploadOrderDraft"));
  let fileName=  $('#filenameDraft').val();
  let fileType= fileName.split('.').pop();


  if(fileType !== "xlsx" && fileType !== "xls"){
    DevExpress.ui.notify({
        message: "Chỉ nhận excel file",
        width: 450
    },"warning",5000)
    $('#filenameDraft').val("")
    return;
  }

    //   let data ={
    //     fileName:fileName
    //   }
  if(fileName==="" ){
    DevExpress.ui.notify({
        message: "Chọn file trước khi nhập",
        width: 450
    },"warning",5000)
  } else{
      console.log(fileName);
      $.ajax({
          type:"POST",
        //   data:JSON.stringify(data),
        data:formData,
        //   contentType:"application/json" ,
          contentType:false ,
          url:"/kho/OrderDraft",
          cache: false, 
          processData:false,
          success:(res)=>{

              if(res.statusErr){
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"success",5000)
                $('#filenameDraft').val("")
                loadPanel.hide()

              } else{
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"error",5000)
                $('#filenameDraft').val("")
                loadPanel.hide()

              }

          }
      })

  }


}


const upload=()=>{
    loadPanelCT.show()
    // let formData=new FormData($("frmUpload"));
    let formData  =new FormData(document.getElementById("frmUpload"));
    // for(let i=0; i<this.files.length;i++){
    //     formData.append('file',this.files[i]);
    // }
  let fileName=  $('#filename').val();
  let fileType= fileName.split('.').pop();


  if(fileType !== "xlsx" && fileType !== "xls"){
    DevExpress.ui.notify({
        message: "Chỉ nhận excel file",
        width: 450
    },"warning",5000)
    $('#filename').val("")
    return;
  }

    //   let data ={
    //     fileName:fileName
    //   }
  if(fileName==="" ){
    DevExpress.ui.notify({
        message: "Chọn file trước khi nhập",
        width: 450
    },"warning",5000)
  } else{
      console.log(fileName);
      $.ajax({
          type:"POST",
        //   data:JSON.stringify(data),
        data:formData,
        //   contentType:"application/json" ,
          contentType:false ,
          url:"/kho/Order",
          cache: false, 
          processData:false,
          success:(res)=>{

              if(res.statusErr){
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"success",5000)
                $('#filename').val("")
                loadPanelCT.hide()

              } else{
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"error",5000)
                $('#filename').val("")
                loadPanelCT.hide()

              }

          }
      })

  }


}

const loadTooltip=(id,targetButton)=>{
    $(`#${id}`).dxTooltip({
        target: `#${targetButton}`,
        showEvent: "mouseenter",
        hideEvent: "mouseleave",
        closeOnOutsideClick: false
    }); 
}

$(function(){
    MY='None';
    OrderDraftGridLoad(MY)
    OrderGridLoad(MY);
    loadTooltip("tooltipUpload","btnUpload");
    

});

