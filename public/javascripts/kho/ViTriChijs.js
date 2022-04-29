


let _ViTriChi='',_TenViTriChiVN='',_TenViTriChiEN=''

const GridViewVitriChi = () => {
    var url = "/api/wacoal_VITRICHIITEM_Load_Web_V1";
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        key: "VITRICHI",
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

    $("#GridViTriChi").dxDataGrid({
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
                dataField: "VITRICHI",
                caption: "Vị Trí Chỉ",
                alignment: "left",
                // width:200
            },
            {
                dataField: "VITRICHINAMEVN",
                caption: "Tên Vị Trí Chỉ (VN)",
                alignment: "left",
                // width:200
            },
            {
                dataField: "VITRICHINAMEEN",
                caption: "Tên Vị Trí Chỉ (VN)",
                alignment: "left",
                visible:false
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
            const ViTriChi = getVITriChiDataItem(e.row);
            _ViTriChi = ViTriChi.ViTriChi;
            _TenViTriChiVN=ViTriChi.TenViTriChiVN;
            _TenViTriChiEN=ViTriChi.TenViTriChiEN;
            // console.log("_ViTriChi " + _ViTriChi + "_TenViTriChiVN " + _TenViTriChiVN +"_TenViTriChiEN " + _TenViTriChiEN);
            // const focusedRowKey = e.component.option("focusedRowKey");
        }
    }).dxDataGrid("instance");

}

function getVITriChiDataItem(row) {
    const rowData = row && row.data;
    const VitriChiItem = {
        ViTriChi: "",
        TenViTriChiVN: "",
        TenViTriChiEN: "",
    };
    if(rowData) {
        VitriChiItem.ViTriChi = rowData.VITRICHI;
        VitriChiItem.TenViTriChiVN = rowData.VITRICHINAMEVN;
        VitriChiItem.TenViTriChiEN = rowData.VITRICHINAMEEN;
        // if(rowData.Task_Completion) {
        //     MauchiItem.progress = rowData.Task_Completion + "%";
        // }
    }
    return VitriChiItem;
}

const resetForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitInsert");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
           $('#txtViTriChi').focus();
        })
        $('#txtViTriChi').removeAttr("readonly") 
        $('#txtViTriChi').val('')
        $('#txtTenViTriChiVN').val('')
        $('#txtTenViTriChiEN').val('')
       
}

const EditForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitEdit");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtTenViTriChiVN').focus();
        })
        $('#txtViTriChi').attr("readonly","true") 
        $('#txtViTriChi').val(_ViTriChi);
        $('#txtTenViTriChiVN').val(_TenViTriChiVN);
        $('#txtTenViTriChiEN').val(_TenViTriChiEN);
        // $('#txtTenViTriChiVN').val(_CongThucTinhChi)
 
      

   
}
const deleteData=() => {
    let data={
        ViTriChi:_ViTriChi,
    };

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType:'application/json',
        url:'/kho/ViTriChi/delete',
        success: (res) =>{
            if(res.statusErr){
                alert(res.errMes);
                $('#modalAddUpdate').modal('hide');
                GridViewVitriChi();
            } else{
                alert(res.errMes);
            }
        }
    })

}

const SaveData = () => {
    let data = {
        ViTriChi: $("#txtViTriChi").val(),
        TenVitriChiVN:$("#txtTenViTriChiVN").val(),
        TenVitriChiEN:$("#txtTenViTriChiEN").val(),
        status: $('#btnSave').val()
    };

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType: 'application/json',
        url:'/kho/ViTriChi',
        success: (res) => {
            if(res.statusErr){
                $('#modalAddUpdate').modal('hide');
                alert(res.errMes);
                GridViewVitriChi();
            } else{
                alert(res.errMes);
            }
        }

    })

}

$(function() {
    GridViewVitriChi();
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

  
       