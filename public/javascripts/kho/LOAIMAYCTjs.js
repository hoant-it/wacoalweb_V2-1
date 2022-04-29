


let _MAUNL='',_LOAICHI='',_MAUCHI=''

const GridViewLoaiMayCT = () => {
    var url = "/api/wacoal_LOAIMAYCT_Load_V1";
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        key: "MAMAY",
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
                dataField: "MAMAY",
                caption: "Mã Máy",
                alignment: "left",
            },
            // {
            //     dataField: "KYHIEUMAY",
            //     caption: "Ký Hiệu Máy",
            //     alignment: "left",
            // },
            {
                dataField: "LOAIMAY",
                caption: "Loại Máy",
                alignment: "left",
            },
            {
                dataField: "VITRICHI",
                caption: "Vị Trí Chỉ",
                alignment: "left",
            },
            {
                dataField: "HESOALPHA",
                caption: "Hệ Số Alpha",
                alignment: "left",
            },
            {
                dataField: "HESOBETA",
                caption: "Hệ Số Beta",
                alignment: "left",
            },
            {
                dataField: "CONGTHUCTINHCHI",
                caption: "Công Thúc Tính chỉ",
                alignment: "left",
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
            // const Mauchi = getMauChiDataItem(e.row);
            // _MAUNL = Mauchi.MauNl;
            // _LOAICHI=Mauchi.LoaiChi;
            // _MAUCHI=Mauchi.MauChi;
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
                alert(res.errMes);
                $('#modalAddUpdate').modal('hide');
                GridViewMauChi();
            } else{
                alert(res.errMes);
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
                alert(res.errMes);
                GridViewMauChi();
            } else{
                alert(res.errMes);
            }
        }

    })

}

$(function() {
    GridViewLoaiMayCT();

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

  
       