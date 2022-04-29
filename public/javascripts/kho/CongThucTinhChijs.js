


let _LoaiMay='',_CongThucTinhChi='',_ViTriChi=''

const GridViewCongThucTinhChi = () => {
    var url = "/api/wacoal_CONGTHUCTINHCHIITEM_Load_Web_V1";
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        key: "CTTCKey",
        loadUrl: url,
       
        // insertUrl: url + "/InsertOrder",
        // updateUrl: url + "/UpdateOrder",
        // deleteUrl: url + "/DeleteOrder",
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridCongThucTnhChi").dxDataGrid({
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
        height: 500,
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
                dataField: "LOAIMAY",
                caption: "Loại Máy",
                alignment: "left",
                // width:200
            },
            {
                dataField: "VITRICHI",
                caption: "Vị Trí Chỉ",
                alignment: "left",
                // width:200
            },
            {
                dataField: "CONTHUCTINHCHI",
                caption: "Công Thức Tính Chỉ",
                alignment: "left",
                // width:900
            },
           
              
        ],
      
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
            const CongThucTinhChi = getMauChiDataItem(e.row);
            _LoaiMay = CongThucTinhChi.LoaiMay;
            _CongThucTinhChi=CongThucTinhChi.CongThucTinhChi;
            _ViTriChi=CongThucTinhChi.ViTriChi;
            // console.log("_LoaiMay " + _LoaiMay + "_CongThucTinhChi " + _CongThucTinhChi +"_ViTriChi " + _ViTriChi);
            // const focusedRowKey = e.component.option("focusedRowKey");
        }
    }).dxDataGrid("instance");

}

function getMauChiDataItem(row) {
    const rowData = row && row.data;
    const CongThucTinhChiItem = {
        LoaiMay: "",
        CongThucTinhChi: "",
        ViTriChi: "",
    };
    if(rowData) {
        CongThucTinhChiItem.LoaiMay = rowData.LOAIMAY;
        CongThucTinhChiItem.CongThucTinhChi = rowData.CONTHUCTINHCHI;
        CongThucTinhChiItem.ViTriChi = rowData.VITRICHI;
        // if(rowData.Task_Completion) {
        //     MauchiItem.progress = rowData.Task_Completion + "%";
        // }
    }
    return CongThucTinhChiItem;
}

const resetForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitInsert");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            const searchBoxLoaiMay = $("#searchBoxLoaiMay").dxSelectBox("instance");
            searchBoxLoaiMay.focus();
            // $('#txtLoaiMay').focus();
        }) 
        $("#searchBoxLoaiMay") .dxSelectBox("instance") .option("value", '')
        $("#searchBoxLoaiMay").dxSelectBox({
            readOnly: false
        }); 
        $("#searchBoxViTriChi") .dxSelectBox("instance") .option("value", '')
        $("#searchBoxViTriChi").dxSelectBox({
            readOnly: false
        }); 
        $('#txtCongThucTinhChi').val('')
  
}

const EditForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitEdit");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtCongThucTinhChi').focus();
        })
        $("#searchBoxLoaiMay") .dxSelectBox("instance") .option("value", _LoaiMay)
        $("#searchBoxLoaiMay").dxSelectBox({
            readOnly: true
        }); 
        $("#searchBoxViTriChi") .dxSelectBox("instance") .option("value", _ViTriChi)
        $("#searchBoxViTriChi").dxSelectBox({
            readOnly: true
        }); 
        $('#txtCongThucTinhChi').val(_CongThucTinhChi)
 
      

   
}
const deleteData=() => {
    let data={
        LoaiMay:_LoaiMay,
        VitriChi:_ViTriChi
    };

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType:'application/json',
        url:'/kho/congthuctinhchi/delete',
        success: (res) =>{
            if(res.statusErr){
                alert(res.errMes);
                $('#modalAddUpdate').modal('hide');
                GridViewCongThucTinhChi();
            } else{
                alert(res.errMes);
            }
        }
    })

}

const SaveData = () => {
    let data = {
        LoaiMay: $("#searchBoxLoaiMay").dxSelectBox('instance').option('value'),
        VitriChi:$("#searchBoxViTriChi").dxSelectBox('instance').option('value'),
        CongThucTinhChi:$('#txtCongThucTinhChi').val(),
        status: $('#btnSave').val()
    };

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType: 'application/json',
        url:'/kho/congthuctinhchi',
        success: (res) => {
            if(res.statusErr){
                $('#modalAddUpdate').modal('hide');
                alert(res.errMes);
                GridViewCongThucTinhChi();
            } else{
                alert(res.errMes);
            }
        }

    })

}

const searchBoxLoaiMay=() =>{
    const selectBoxData =  DevExpress.data.AspNet.createStore({
        key: "LOAIMAY",
        loadMode:"raw",
        loadUrl:"/api/wacoal_LoaiMay_Load_Web_V1",
    });

    var searchBox = $("#searchBoxLoaiMay").dxSelectBox({
        dataSource:selectBoxData,
        // DevExpress.data.AspNet.createStore({
        //     key: "MAKH",
        //     loadUrl: serviceUrl + "/Khowacoal_KHACHHANG_load_Web_V1",
        //     // insertUrl: serviceUrl + "/InsertAction"
        // }),
        displayExpr: "LOAIMAY_NAME_VN",
        valueExpr: "LOAIMAY",
        searchEnabled: true,
        searchExpr:'LOAIMAY_NAME_VN',
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

const searchBoxViTriChi=() =>{
    const selectBoxData =  DevExpress.data.AspNet.createStore({
        key: "VITRICHI",
        loadMode:"raw",
        loadUrl:"/api/wacoal_VITRICHIITEM_Load_Web_V1",
    });

    var searchBox = $("#searchBoxViTriChi").dxSelectBox({
        dataSource:selectBoxData,
        // DevExpress.data.AspNet.createStore({
        //     key: "MAKH",
        //     loadUrl: serviceUrl + "/Khowacoal_KHACHHANG_load_Web_V1",
        //     // insertUrl: serviceUrl + "/InsertAction"
        // }),
        displayExpr: "VITRICHINAMEVN",
        valueExpr: "VITRICHI",
        searchEnabled: true,
        searchExpr:'VITRICHINAMEVN',
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

$(function() {
    GridViewCongThucTinhChi();
    searchBoxLoaiMay();
    searchBoxViTriChi();
    $('#btnAddNew').click(() =>{
        resetForm();
    })
    $('#btnedit').click(() =>{
        EditForm();
    })
    $('#btnDeleteId').click((event) =>{
        event.preventDefault();
        if (!confirm("Are you sure you want to Delete selected row?")){
        }else{
            deleteData();
        }
    })
    $('#btnSave').click((e) => {
        e.preventDefault();
        SaveData();
    })
  

});

  
       