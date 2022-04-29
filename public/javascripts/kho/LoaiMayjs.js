


let _LoaiMay='',_LoaiMayNameVN='',__LoaiMayNameEN=''

const GridViewLoaiMay = () => {
    var url = "/api/wacoal_LoaiMay_Load_Web_V1";
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        key: "LOAIMAY",
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

    $("#GridLoaiMay").dxDataGrid({
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
            },
            {
                dataField: "LOAIMAY_NAME_VN",
                caption: "Tên Máy (VN)",
                alignment: "left",
            },
            {
                dataField: "LOAIMAY_NAME_EN",
                caption: "Tên Máy (EN)",
                alignment: "left",
                visible: false
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
            const LoaiMay = getMauChiDataItem(e.row);
            _LoaiMay = LoaiMay.LoaiMay;
            _LoaiMayNameVN=LoaiMay.LoaiMayNameVN;
            _LoaiMayNameEN=LoaiMay.LoaiMayNameEN;
            // console.log("_LoaiMay " + _LoaiMay + "_LoaiMayNameVN " + _LoaiMayNameVN +"__LoaiMayNameEN " + __LoaiMayNameEN);
            // const focusedRowKey = e.component.option("focusedRowKey");
        }
    }).dxDataGrid("instance");

}

function getMauChiDataItem(row) {
    const rowData = row && row.data;
    const LoaiMayItem = {
        LoaiMay: "",
        LoaiMayNameVN: "",
        LoaiMayNameEN: "",
    };
    if(rowData) {
        LoaiMayItem.LoaiMay = rowData.LOAIMAY;
        LoaiMayItem.LoaiMayNameVN = rowData.LOAIMAY_NAME_VN;
        LoaiMayItem.LoaiMayNameEN = rowData.LOAIMAY_NAME_EN;
        // if(rowData.Task_Completion) {
        //     MauchiItem.progress = rowData.Task_Completion + "%";
        // }
    }
    return LoaiMayItem;
}

const resetForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitInsert");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtLoaiMay').focus();
        }) 
    $('#txtLoaiMay').removeAttr("readonly") 
    $('#txtLoaiMay').val('');
    $('#txtLoaiMayNameVN').val('');
    $('#txtLoaiMayNameEN').val('');
  
}

const EditForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitEdit");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtLoaiMayNameVN').focus();
        }) 
        $('#txtLoaiMay').val(_LoaiMay)
        $('#txtLoaiMay').attr("readonly","true") 
        // $('#txtLoaiMay').val(_LoaiMay)
        $('#txtLoaiMayNameVN').val(_LoaiMayNameVN)
        $('#txtLoaiMayNameEN').val(_LoaiMayNameEN)
      

   
}
const deleteData=() => {
    let data={
        LoaiMay:_LoaiMay
    };

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType:'application/json',
        url:'/kho/LoaiMay/delete',
        success: (res) =>{
            if(res.statusErr){
                alert(res.errMes);
                $('#modalAddUpdate').modal('hide');
                GridViewLoaiMay();
            } else{
                alert(res.errMes);
            }
        }
    })

}

const SaveData = () => {
    let data = {
        LoaiMay: $('#txtLoaiMay').val(),
        LoaiMayNameVN:$('#txtLoaiMayNameVN').val(),
        LoaiMayNameEN:$('#txtLoaiMayNameEN').val(),
        status: $('#btnSave').val()
    };

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType: 'application/json',
        url:'/kho/loaimay',
        success: (res) => {
            if(res.statusErr){
                $('#modalAddUpdate').modal('hide');
                alert(res.errMes);
                GridViewLoaiMay();
            } else{
                alert(res.errMes);
            }
        }

    })

}

$(function() {
    GridViewLoaiMay();
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

  
       