

let _MAUNL='',_LOAICHI='',_MAUCHI=''

const GridViewMauChi = () => {

    var url = "/api/wacoal_MAUCHIMAUNL_Load_Web_V1";
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        key: "KeyCode",
        loadUrl: url,
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridMauChiMauNl").dxDataGrid({
        dataSource: listTinhChi,
        //phan trang
        paging: {
            pageSize: 10
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [10, 25, 50, 100]
        },
        // reshapeOnPush: true,
        columnsAutoWidth: true,
        height: 700,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        columnAutoWidth: true,
        // export:{
        //     enabled: true
        // },
  
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
        searchPanel: {
            visible: true,
            highlightCaseSensitive: true,
            // width: 240,
            // placeholder: "Search..."
        },
        // headerFilter: {
        //     visible: false
        // },
        // groupPanel: {
        //     visible: false
        // },
        // scrolling: {
        //     mode: "virtual"
        // },
        
        columns: [
            {
                dataField: "MAUNL",
                caption: "Màu Nguyên Liệu",
                alignment: "left",
            },
            {
                dataField: "LOAICHI",
                caption: "Loại Chỉ",
                alignment: "left",
            },
            {
                dataField: "MAUCHI",
                caption: "Màu Chỉ",
                alignment: "left",
            },
              
        ],
        onToolbarPreparing: function(e) {
            // var dataGrid = e.component;

            e.toolbarOptions.items.unshift({
                location: "alter",
                template: function(){
                    return $("<div/>")
                        .addClass("informer")
                        .append(
                         `
                         <form action="/kho/MauChiMauNLInput" method="POST" enctype="multipart/form-data" id="frmUpload">
                         <input type="file" name="filename" id="filename" />
                         </from>

                         `
                        // `
                        // <form action="/kho/MauChiMauNLInput" method="POST" enctype="multipart/form-data" id="frmUpload">
                        // <input type="file" name="filename" id="filename" />
                        // <button type="submit"> Nhập File Excel </button>
                        // </from>
                        // `
                        // '<div class="alert alert-info" role="alert">Nhập file Excel</div>'
                        //    $("<span />")
                        //      .addClass("name")
                        //      .text("Total Count")
                        // 
                        );
                }
            }, {
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
                location:"alter",
                widget:"dxButton",
                options:{
                    icon:"add",
                    text:"",
                    onInitialized: function (e) {
                        e.element.attr("id", "btnAdd");
                    },
                    onClick: function (){
                        // console.log("clicker")
                        resetForm();
                        // mauChiMauNL.resetForm();
                    }
                }
            },{
                location:"alter",
                widget:"dxButton",
                options:{
                    icon:"edit",
                    text:"",
                    onInitialized: function (e) {
                        e.element.attr("id", "btnEdit");
                    },
                    onClick: function (){
                        // console.log("clicker")
                        EditForm();
                    }
                }
            },{
                location:"alter",
                widget:"dxButton",
                options:{
                    icon:"remove",
                    text:"",
                    onInitialized: function (e) {
                        e.element.attr("id", "btnDelete");
                    },
                    onClick: function (){
                        // console.log("clicker")
                        if (!confirm("Are you sure you want to Delete selected row?")){
                        }else{
                            deleteData();
                        }
                        // deleteData();
                    }
                }

            });
        },
        
      
        onFocusedRowChanging: function(e) {
            var rowsCount = e.component.getVisibleRows().length,
                pageCount = e.component.pageCount(),
                pageIndex = e.component.pageIndex(),
                key = e.event && e.event.key;

            if (key && e.prevRowIndex === e.newRowIndex) {
                if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
                    e.component.pageIndex(pageIndex + 1).done(function() {
                        e.component.option("focusedRowIndex", 0);
                    });
                } else if (e.newRowIndex === 0 && pageIndex > 0) {
                    e.component.pageIndex(pageIndex - 1).done(function() {
                        e.component.option("focusedRowIndex", rowsCount - 1);
                    });
                }
            }
        },
        onFocusedRowChanged: function(e) {
            const Mauchi = getMauChiDataItem(e.row);
            _MAUNL = Mauchi.MauNl;
            _LOAICHI=Mauchi.LoaiChi;
            _MAUCHI=Mauchi.MauChi;
            // console.log("_MAUNLt " + Mauchi.MauNl + "_LOAICHI " + Mauchi.LoaiChi +"_MAUCHI " + Mauchi.MauChi);
            // const focusedRowKey = e.component.option("focusedRowKey");
        }
    }).dxDataGrid("instance");

}

function getMauChiDataItem(row) {
    const rowData = row && row.data;
    const MauchiItem = {
        MauNl: "",
        LoaiChi: "",
        MauChi: "",
    };
    if(rowData) {
        MauchiItem.MauNl = rowData.MAUNL;
        MauchiItem.LoaiChi = rowData.LOAICHI;
        MauchiItem.MauChi = rowData.MAUCHI;
        // if(rowData.Task_Completion) {
        //     MauchiItem.progress = rowData.Task_Completion + "%";
        // }
    }
    return MauchiItem;
}

const resetForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitInsert");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtMauNL').focus();
        }) 
    $('#txtMauNL').removeAttr("readonly") 
    $("#searchBoxLoaiChi").dxSelectBox({
        readOnly: false
    });
    $('#txtMauNL').val('');
    $("#searchBoxLoaiChi") .dxSelectBox("instance") .option("value", 'GOMU')
    $('#txtMauChi').val('');
  
}

const EditForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitEdit");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtMauChi').focus();
        }) 
        $('#txtMauNL').val(_MAUNL)
        // $('#txtLoaiChi').val(_LOAICHI)
        $('#txtMauChi').val(_MAUCHI)
      
    $('#txtMauNL').attr("readonly","true") 
    $("#searchBoxLoaiChi") .dxSelectBox("instance") .option("value", _LOAICHI)
    $("#searchBoxLoaiChi").dxSelectBox({
        readOnly: true
    });
   
}

const searchBoxLoaiChi=() =>{
    const selectBoxData =  DevExpress.data.AspNet.createStore({
        key: "LOAICHICODE",
        loadMode:"raw",
        loadUrl:"/api/wacoal_LOAICHIITEM_Load_V1",
    });

    var searchBox = $("#searchBoxLoaiChi").dxSelectBox({
        dataSource:selectBoxData,
        // DevExpress.data.AspNet.createStore({
        //     key: "MAKH",
        //     loadUrl: serviceUrl + "/Khowacoal_KHACHHANG_load_Web_V1",
        //     // insertUrl: serviceUrl + "/InsertAction"
        // }),
        displayExpr: "LOAICHICODE",
        valueExpr: "LOAICHICODE",
        searchEnabled: true,
        searchExpr:'LOAICHICODE',
        searchMode:'contains',
        searchTimeout:200,
        minSearchLength:0,
        showDataBeforeSearch:false,
        //       onValueChanged: function (data) {
        //     // var $result = $(".current-value");

        //     if (data.value !== null) {
        //         var selectedItem = data.component.option('selectedItem');
        //         // $result.text(selectedItem.Name + " (ID: " + selectedItem.ID + ")");
        //         console.log(" (ID: " + selectedItem.MAKH + ")")
        //     } else {
        //         console.log("Not selected")
        //         // $result.text("Not selected");
        //     }
        // },
    }).dxSelectBox("instance");
}
const deleteData=() => {
    let data={
        mauNl:_MAUNL,
        LoaiChi:_LOAICHI
    };

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType:'application/json',
        url:'/kho/MauChiMauNl/delete',
        success: (res) =>{
            if(res.statusErr){
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"success",5000),
                // alert(res.errMes);
                $('#modalAddUpdate').modal('hide');
                GridViewMauChi();
            } else{
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"error",5000)
                // alert(res.errMes);
            }
        }
    })

}

const SaveData = () => {
    
    let data = {
        mauNL: $('#txtMauNL').val(),
        loaiChi: $("#searchBoxLoaiChi").dxSelectBox('instance').option('value'),
        mauChi:$('#txtMauChi').val(),
        status: $('#btnSave').val()
    };

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType: 'application/json',
        url:'/kho/MauChiMauNl',
        success: (res) => {
            if(res.statusErr){
    
                $('#modalAddUpdate').modal('hide');
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"success",5000), //error,success,warning
                // alert(res.errMes);
                GridViewMauChi();
            } else{
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"error",5000)
                // alert(res.errMes);
            }
        }

    })

}

const upload=()=>{
    // let formData=new FormData($("frmUpload"));
    let formData  =new FormData(document.getElementById("frmUpload"));
    // for(let i=0; i<this.files.length;i++){
    //     formData.append('file',this.files[i]);
    // }
  let fileName=  $('#filename').val();
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
          url:"/kho/MauChiMauNLInput",
          cache: false, 
          processData:false,
          success:(res)=>{

              if(res.statusErr){
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"success",5000)
                GridViewMauChi();
              } else{
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"error",5000)

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

$(function Main() {
   
    GridViewMauChi();
    searchBoxLoaiChi();
    loadTooltip("tooltipUpload","btnUpload");
    loadTooltip("tooltiAdd","btnAdd");
    loadTooltip("tooltiEdit","btnEdit");
    loadTooltip("tooltiDelete","btnDelete");
    $('#btnSave').click((e) => {
        e.preventDefault();
        SaveData();
    })
});

  
       