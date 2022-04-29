


let _LoaiChi='',_LoaiChiNameVN='',__LoaiChiNameEN=''

const GridViewLoaiChi = () => {
    var url = "/api/wacoal_LOAICHIITEM_Load_V1";
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        key: "LOAICHICODE",
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

    $("#GridLoaiChi").dxDataGrid({
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
                dataField: "LOAICHICODE",
                caption: "Loại Chỉ",
                alignment: "left",
            },
            {
                dataField: "LOAICHINAME_VN",
                caption: "Tên Chỉ (VN)",
                alignment: "left",
            },
            {
                dataField: "LOAICHINAME_EN",
                caption: "Tên Chỉ (EN)",
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
            const LoaiChi = getMauChiDataItem(e.row);
            _LoaiChi = LoaiChi.LoaiChi;
            _LoaiChiNameVN=LoaiChi.LoaiChiNameVN;
            __LoaiChiNameEN=LoaiChi.LoaiChiNameEN;
            // console.log("_LoaiChi " + _LoaiChi + "_LoaiChiNameVN " + _LoaiChiNameVN +"__LoaiChiNameEN " + __LoaiChiNameEN);
            // const focusedRowKey = e.component.option("focusedRowKey");
        }
    }).dxDataGrid("instance");

}

function getMauChiDataItem(row) {
    const rowData = row && row.data;
    const LoaiChiItem = {
        LoaiChi: "",
        LoaiChiNameVN: "",
        LoaiChiNameEN: "",
    };
    if(rowData) {
        LoaiChiItem.LoaiChi = rowData.LOAICHICODE;
        LoaiChiItem.LoaiChiNameVN = rowData.LOAICHINAME_VN;
        LoaiChiItem.LoaiChiNameEN = rowData.LOAICHINAME_EN;
        // if(rowData.Task_Completion) {
        //     MauchiItem.progress = rowData.Task_Completion + "%";
        // }
    }
    return LoaiChiItem;
}

const resetForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitInsert");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtLoaiChi').focus();
        }) 
    $('#txtLoaiChi').removeAttr("readonly") 
    $('#txtLoaiChi').val('');
    $('#txtLoaiChiNameVN').val('');
    $('#txtLoaiChiNameEN').val('');
  
}

const EditForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitEdit");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtLoaiChiNameVN').focus();
        }) 
        $('#txtLoaiChi').val(_LoaiChi)
        $('#txtLoaiChi').attr("readonly","true") 
        // $('#txtLoaiChi').val(_LOAICHI)
        $('#txtLoaiChiNameVN').val(_LoaiChiNameVN)
        $('#txtLoaiChiNameEN').val(__LoaiChiNameEN)
      

   
}
const deleteData=() => {
    let data={
        Loaichi:_LoaiChi
    };

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType:'application/json',
        url:'/kho/loaichi/delete',
        success: (res) =>{
            if(res.statusErr){
                alert(res.errMes);
                $('#modalAddUpdate').modal('hide');
                GridViewLoaiChi();
            } else{
                alert(res.errMes);
            }
        }
    })

}

const SaveData = () => {
    let data = {
        LoaiChi: $('#txtLoaiChi').val(),
        LoaiChiNameVN:$('#txtLoaiChiNameVN').val(),
        LoaiChiNameEN:$('#txtLoaiChiNameEN').val(),
        status: $('#btnSave').val()
    };

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType: 'application/json',
        url:'/kho/loaichi',
        success: (res) => {
            if(res.statusErr){
                $('#modalAddUpdate').modal('hide');
                alert(res.errMes);
                GridViewLoaiChi();
            } else{
                alert(res.errMes);
            }
        }

    })

}

$(function() {
    GridViewLoaiChi();
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

  
       