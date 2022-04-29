


let _MaKH='',_TenKHNameVN='';

const GridViewKhachHang = () => {
    var url = "/api/Khowacoal_KHACHHANG_load_Web_V1";
    // console.log(" url " + url );
    var listKhachHang = DevExpress.data.AspNet.createStore({
        key: "MAKH",
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

    $("#GridKhachHang").dxDataGrid({
        dataSource: listKhachHang,
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
                dataField: "MAKH",
                caption: "Mã Khách Hàng",
                alignment: "left",
            },
            {
                dataField: "TENKH_VN",
                caption: "Tên Khách Hàng ",
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
            const KhachHang = getMauChiDataItem(e.row);
            _MaKH = KhachHang.KhachHang;
            _TenKHNameVN=KhachHang.KhachHangNameVN;
            // console.log("_MaKH " + _MaKH + "_TenKHNameVN " + _TenKHNameVN );
            // const focusedRowKey = e.component.option("focusedRowKey");
        }
    }).dxDataGrid("instance");

}

function getMauChiDataItem(row) {
    const rowData = row && row.data;
    const KhachHangItem = {
        KhachHang: "",
        KhachHangNameVN: "",
    };
    if(rowData) {
        KhachHangItem.KhachHang = rowData.MAKH;
        KhachHangItem.KhachHangNameVN = rowData.TENKH_VN;
        // if(rowData.Task_Completion) {
        //     MauchiItem.progress = rowData.Task_Completion + "%";
        // }
    }
    return KhachHangItem;
}

const resetForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitInsert");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtMaKH').focus();
        }) 
    $('#txtMaKH').removeAttr("readonly") 
    $('#txtMaKH').val('');
    $('#txtTenKH').val('');
  
}

const EditForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitEdit");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtTenKH').focus();
        }) 
        $('#txtMaKH').val(_MaKH)
        $('#txtMaKH').attr("readonly","true") 
        // $('#txtMaKH').val(_MaKH)
        $('#txtTenKH').val(_TenKHNameVN)
       
      

   
}
const deleteData=() => {
    let data={
        KhachHang:_MaKH
    };

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType:'application/json',
        url:'/kho/KhachHang/delete',
        success: (res) =>{
            if(res.statusErr){
                alert(res.errMes);
                $('#modalAddUpdate').modal('hide');
                GridViewKhachHang();
            } else{
                alert(res.errMes);
            }
        }
    })

}

const SaveData = () => {
    let data = {
        KhachHang: $('#txtMaKH').val(),
        KhachHangNameVN:$('#txtTenKH').val(),
        status: $('#btnSave').val()
    };

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType: 'application/json',
        url:'/kho/KhachHang',
        success: (res) => {
            if(res.statusErr){
                $('#modalAddUpdate').modal('hide');
                alert(res.errMes);
                GridViewKhachHang();
            } else{
                alert(res.errMes);
            }
        }

    })

}

$(function() {
    GridViewKhachHang();
    $('#btnAddNew').click(() =>{
        resetForm();
    })
    $('#btnedit').click(() =>{
        EditForm();
    })
    $('#btnDeleteId').click((event) =>{
        event.preventDefault();
        if (!confirm("Bạn chắc chắn muốn xóa khách Hàng " + _MaKH)){
        }else{
            deleteData();
        }
    })
    $('#btnSave').click((e) => {
        e.preventDefault();
        SaveData();
    })
  

});

  
       