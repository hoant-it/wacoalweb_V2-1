
var  _keHangId
var _keHangName=''
var _NL 
var _oderNo 
var _color
var _slTon
var _donVi
var sSearch='';
var _idKho='0'
var titleheader=document.getElementById("titleHeader")



const GetURLParameter=(sParam)=>{
    var sPageUrl= window.location.search.substring(1);
    var sUrlVariables= sPageUrl.split('&');
    for(var i =0; i< sUrlVariables.length; i++){
        var sParemetterName= sUrlVariables[i].split('=');
        if(sParemetterName[0] === sParam){
            return sParemetterName[1];
        }
    }
}
const GetKeHangName = () => {
    
    let data = {
        ID:_keHangId
    };
    let urlPatch='wacoal_KEHANG_Load_By_Id_Web_V1/'+data.ID

    $.ajax({
        type:'GET',
        // data:JSON.stringify(data),
        // contentType: 'application/json',
        url:urlPatch,
        success: (res) => {
            if(res.status){
                _keHangName=res.keHangName
                $('#titleHeader').val(_keHangName)
                titleheader.innerHTML='Kho Nguyên Liệu ( '+_keHangName+' )'

            } else{
                DevExpress.ui.notify({
                    message: res.keHangName,
                    width: 450
                },"error",5000)
                // alert(res.errMes);
            }
        }

    })

}

const KeHangGridLoad  = () => {
    var url = "wacoal_KHONL_Web_Load_V1/";
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        key: "ID",
        loadUrl: url + _keHangId,
       
        // insertUrl: url + "/InsertOrder",
        // updateUrl: url + "/UpdateOrder",
        // deleteUrl: url + "/DeleteOrder",
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridKeHang").dxDataGrid({
        dataSource: listTinhChi,
        // reshapeOnPush: true,
        columnsAutoWidth: true,
        height: 450,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        // export:{
        //     enabled: true
        // },
        // onExporting(e) {
        //     const workbook = new ExcelJS.Workbook();
        //     const worksheet = workbook.addWorksheet('Order');
      
        //     DevExpress.excelExporter.exportDataGrid({
        //       component: e.component,
        //       worksheet,
        //       autoFilterEnabled: true,
        //     }).then(() => {
        //       workbook.xlsx.writeBuffer().then((buffer) => {
        //         saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `Order_${MY}.xlsx`);
        //       });
        //     });
        //     e.cancel = true;
        //   },
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
        headerFilter: {
            visible: true
        },
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
            },
            {
                caption: "ID",
                alignment:"left",
                dataField: "ID",
                visible:false
            },
            {
                caption: "_keHangId",
                alignment:"left",
                dataField: "_keHangId",
                visible:false
            },
            {
                caption: "Kệ",
                alignment:"left",
                dataField: "SHEFTDES",
            },
            {
                caption: "Nguyên Liệu",
                alignment:"left",
                dataField: "MATERIAL",
            },
            {
                caption: "ORDERNO",
                alignment:"left",
                dataField: "ORDERNO",
            },
            {
                caption: "Màu",
                alignment:"left",
                dataField: "COLOR",
            },
            {
                caption: "SL Nhập",
                alignment:"left",
                dataField: "QUANTITY",
            },
            {
                caption: "SL Xuất",
                alignment:"left",
                dataField: "QUANTITYXUAT",
            },
            {
                caption: "SL Tồn",
                alignment:"left",
                dataField: "QtyTon",
            },
            {
                caption: "UNIT",
                alignment:"left",
                dataField: "UNIT",
            },
            {
                caption: "Người Nhập",
                alignment:"left",
                dataField: "USERCREATE",
            },
            {
                caption: "TG Nhập",
                alignment:"left",
                dataField: "TIMECREATE",
            },
            {
                caption: "USERUPDATE",
                alignment:"left",
                dataField: "USERUPDATE",
                visible:false
            },
            {
                caption: "TIMEUPDATE",
                alignment:"right",
                dataField: "TIMEUPDATE",
                visible:false
            },
      
           
        ],
        // onToolbarPreparing: function(e){
        //     e.toolbarOptions.items.unshift(
        //     //     {
        //     //     location:"alter",
        //     //     template:function(){
        //     //         return $('<div/>')
        //     //         .addClass("informer")
        //     //             .append(
        //     //              `
        //     //              <form action="" method="POST" enctype="multipart/form-data" id="frmUpload">
        //     //              <input type="file" name="filename" id="filename" />
        //     //              </from>
        //     //              `
        //     //             );
        //     //     }

        //     // },
        //     // {
        //     //     location:"alter",
        //     //     widget:"dxButton",
        //     //     options:{
        //     //         icon:"upload",
        //     //         text:"",
        //     //         onInitialized: function (e) {
        //     //             e.element.attr("id", "btnUpload");
        //     //         },
        //     //         onClick: function (){
        //     //             // console.log("clicker")
        //     //            upload();
        //     //         }
        //     //     }
        //     // },
          
        //     //      {
        //     //     location:"alter",
        //     //     widget:"dxButton",
        //     //     options:{
        //     //         icon:"add",
        //     //         text:"",
        //     //         onInitialized: function (e) {
        //     //             e.element.attr("id", "btnAdd");
        //     //         },
        //     //         onClick: function (){
        //     //             // console.log("clicker")
        //     //             resetForm(_keHangId)
        //     //         }
        //     //     }
        //     // },
        //     // {
        //     //     location:"alter",
        //     //     widget:"dxButton",
        //     //     options:{
        //     //         icon:"edit",
        //     //         text:"",
        //     //         onInitialized: function (e) {
        //     //             e.element.attr("id", "btnEdit");
        //     //         },
        //     //         onClick: function (){
        //     //             // console.log("clicker")
        //     //             EditForm()
        //     //         }
        //     //     }
        //     // },
         
        //     )
        // },
        onFocusedRowChanged: function(e) {
            getDataItem(e.row);
        }
    }).dxDataGrid("instance");

}
const LSXuatGridLoad  = (KHONLID) => {
    var url = "wacoal_KHONLXUAT_Load_By_KHONLID_web_V1/";
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        key: "ID",
        loadUrl: url + KHONLID,
       
        // insertUrl: url + "/InsertOrder",
        // updateUrl: url + "/UpdateOrder",
        // deleteUrl: url + "/DeleteOrder",
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridLSXuat").dxDataGrid({
        dataSource: listTinhChi,
        // reshapeOnPush: true,
        columnsAutoWidth: true,
        height: 450,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
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
        headerFilter: {
            visible: true
        },
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
            },
            {
                caption: "ID",
                alignment:"left",
                dataField: "ID",
                visible:false
            },
            {
                caption: "KHONLID",
                alignment:"left",
                dataField: "KHONLID",
                visible:false
            },
            {
                caption: "Sl Xuất",
                alignment:"left",
                dataField: "QUANTITYXUAT",
            },
            {
                caption: "Người Nhập",
                alignment:"left",
                dataField: "USERCREATE",
            },
            {
                caption: "TG Nhập",
                alignment:"left",
                dataField: "TIMECREATE",
            },
            {
                caption: "USERUPDATE",
                alignment:"left",
                dataField: "USERUPDATE",
                visible:false
            },
            {
                caption: "TIMEUPDATE",
                alignment:"right",
                dataField: "TIMEUPDATE",
                visible:false
            },
        ],
    }).dxDataGrid("instance");

}

function getDataItem(row) {
    const rowData = row && row.data;
    if(rowData) {
        LSXuatGridLoad(rowData.ID)
        _idKho=rowData.ID;
        _keHangId = rowData.SHEFTID;
        _NL = rowData.MATERIAL;
        _oderNo = rowData.ORDERNO;
        _color= rowData.COLOR;
        _slTon=rowData.QtyTon;
        _donVi=rowData.UNIT
    }
   
}


const resetForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitInsert");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtMauNL').focus();
        }) 
      
    // $('#txtMauNL').removeAttr("readonly") 
    // $("#searchBoxKeHang").dxSelectBox({
    //     readOnly: false
    // });
    $("#searchBoxKeHang") .dxSelectBox("instance").option("value", _keHangId)
    $("#searchBoxKeHang").dxSelectBox({
        readOnly: true
        });
    // readOnly: true,
    $('#txtNL').removeAttr("readonly")
    $('#txtNL').val("")
    $('#txtOrder').removeAttr("readonly")
    $('#txtOrder').val("")
    $('#txtColor').removeAttr("readonly")
    $('#txtColor').val("")
    $('#txtQty').val("")
    $('#frmSlNhap').show()
    $('#frmSlTon').hide()
    $('#frmSlXuat').hide()
    $('#txtUnit').removeAttr("readonly")
    $('#txtUnit').val("MTR")
}

const EditForm = () => {

    if(_idKho == '0'){
        DevExpress.ui.notify({
            message: "Chưa chọn dữ liệu",
            width: 450
        },"error",5000)
        return;
    }

    if(_slTon == 0){
        DevExpress.ui.notify({
            message: "Không còn số lượng",
            width: 450
        },"error",5000)
        return;
    }
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitEdit");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtMauChi').focus();
        }) 
        $("#searchBoxKeHang") .dxSelectBox("instance").option("value", _keHangId)
        $("#searchBoxKeHang").dxSelectBox({
        readOnly: true
        });
        $('#frmSlNhap').hide()
        $('#frmSlTon').show()
       
        $('#frmSlXuat').show()
        $('#txtNL').attr("readonly","true")
        $('#txtNL').val(_NL)
        $('#txtOrder').attr("readonly","true")
        $('#txtOrder').val(_oderNo)
        $('#txtColor').attr("readonly","true")
        $('#txtColor').val(_color)
        $('#txtQtyTon').attr("readonly","true") 
        $('#txtQtyTon').val(_slTon)
        $('#txtQtyXuat').val(_slTon)
        $('#txtUnit').attr("readonly","true") 
        $('#txtUnit').val(_donVi)

        // $('#txtMauNL').val(_MAUNL)
        // $('#txtMauChi').val(_MAUCHI)
      
    // $('#txtMauNL').attr("readonly","true") 
    // $("#searchBoxLoaiChi") .dxSelectBox("instance") .option("value", _LOAICHI)
    // $("#searchBoxLoaiChi").dxSelectBox({
    //     readOnly: true
    // });
   
}

const ShowGrid = () => {
    KeHangGridLoad()
}

const SaveData = () => {
    
    let data = {
        btnSave:$('#btnSave').val(),
        keHang:$("#searchBoxKeHang").dxSelectBox('instance').option('value'),
        txtNL: $('#txtNL').val(),
        txtOrder: $('#txtOrder').val(),
        txtColor:$('#txtColor').val(),
        txtQty: $('#txtQty').val(),
        txtUnit: $('#txtUnit').val(),
        txtQtyTon:$('#txtQtyTon').val(),
        txtQtyXuat:$('#txtQtyXuat').val(),
        khoId:_idKho
    };
    if(data.btnSave==="submitEdit"){
        if(parseInt(data.txtQtyXuat)>parseInt(data.txtQtyTon)){
            DevExpress.ui.notify({
                message: "Sl Xuất > SL Tồn",
                width: 450
            },"error",5000)
            return
        }
    }

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType: 'application/json',
        url:'/kho/kehang',
        success: (res) => {
            if(res.statusErr){
    
                $('#modalAddUpdate').modal('hide');
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"success",5000), //error,success,warning
                // alert(res.errMes);
                KeHangGridLoad(data.keHang);
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

const searchBoxKeHang=() =>{
    const selectBoxData =  DevExpress.data.AspNet.createStore({
        key: "ID",
        loadMode:"raw",
        loadUrl:"wacoal_KEHANG_Web_Load_V1",
    });

    var searchBox = $("#searchBoxKeHang").dxSelectBox({
        dataSource:selectBoxData,
        displayExpr: "SHEFTDES",
        valueExpr: "ID",
        searchEnabled: true,
        searchExpr:'SHEFTDES',
        value:"aaa",
        searchMode:'contains',
        searchTimeout:200,
        minSearchLength:0,
        showDataBeforeSearch:false,
        value:_keHangId,
        readOnly: true,
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

const loadTooltip=(id,targetButton)=>{
    $(`#${id}`).dxTooltip({
        target: `#${targetButton}`,
        showEvent: "mouseenter",
        hideEvent: "mouseleave",
        closeOnOutsideClick: false
    }); 
}

$(function(){
    _keHangId=unescape(GetURLParameter("ke"))=='undefined'?0:unescape(GetURLParameter("ke")); 
    GetKeHangName()
    searchBoxKeHang()
   

    $('.addButton').dxButton({
        icon:'add',
        text: 'Thêm Nguyên Liệu',
        onClick: resetForm,
      });
      $('.editButton').dxButton({
        icon:'edit',
        text: 'Lấy Nguyên Liệu',
        onClick: EditForm,
      });
      $('.deleteButton').dxButton({
        icon:'increaseindent',
        text: 'Xem tồn',
        onClick: ShowGrid,
      });

    loadTooltip("tooltipAdd","btnAdd");
    loadTooltip("tooltipEdit","btnEdit");
    $('#btnSave').click((e) => {
        e.preventDefault();
        SaveData();
    })
    
    // console.log(sSearch);


});

