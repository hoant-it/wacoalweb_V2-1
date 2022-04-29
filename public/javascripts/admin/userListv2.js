var _name = '';
var _fullname = '';
var _email = '';
var _positionName = '';
var _deparmentCode = '';
var _positionCode='';

const editData = () => {
         //show modal
     $('#modalAddUpdate').modal('show');
     $('#btnSave').val("submitEdit");
     $('#txtUserName').attr("readonly","true") 
     $('#selectionPosition').val(_positionCode);
     $('#selectionDeparment').val(_deparmentCode);
     $('#modalAddUpdate').on('shown.bs.modal', function () {
        $('#txtFullName').focus();
     }) 
    $('#txtUserName').val(_name);
    $('#txtFullName').val(_fullname);
    $('#txtEmail').val(_email);
    // $('#txtPositionsName').val(_positionName);
  
}
const resetForm = () => {
    $('#txtUserName').val('');
    $('#txtFullName').val('');
    $('#txtEmail').val('');
    $('#txtPositionsName').val('');
}

const saveData = () => {
        var name = $('#txtUserName').val();
        var fullName = $('#txtFullName').val();
        var email = $('#txtEmail').val();
        var positionCode=$('#selectionPosition').val();
        var positionName = $('#txtPositionsName').val();
        var departmentCode = $('#selectionDeparment').val();
        var status=$('#btnSave').val();
        // console.log(status);
        var data = {
            Name: name,
            FullName: fullName,
            Email: email,
            PositionName: positionName,
            DepartmentCode: departmentCode,
            Status:status,
            PositionCode:positionCode
        };

        // data.Name=singleValues;
        // data.title = "title";
        // data.message = "message";
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/admin/userlistv2',
            success: function(res) {
                if (res=== 'ok') {
                    // console.log('success');
                    // console.log(JSON.stringify(res));
                    $('#modalAddUpdate').modal('hide');
                    alert("Update success");
                    location.reload();
                } else {
                    console.log(JSON.stringify(res));
                    alert( res);
                }
            }
        });

    }

    const deleteData = () => {
        var data={
            Name:_name,
            Status:$('#btnDeleteId').val()
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/admin/userlistv2',
            success: (res) =>{
                if(res){
                    // console.log(JSON.stringify(res));
                    alert("sucess");
                    location.reload();
                }
                else{
                    alert("Err");
                }
            }
        });
    }
const RefreshPass = () =>{
    var data={
        Name:_name,
        Status:$('#btnRsPassId').val()
    };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/admin/userlistv2',
        success: (res) =>{
            if(res){
                // console.log(JSON.stringify(res));
                alert("sucess");
                location.reload();
            }
            else{
                alert("Err");
            }
        }
    });
}

    //ham khoi tao: goi tat ca cac ham khac trong day
$(document).ready(function() {
    var table = $('.mydatatable').DataTable();
    $('.mydatatable tbody').on('click', 'tr', function() {
        var data = table.row(this).data();
        _name = data[0];
        _fullname = data[1];
        _email = data[2];
        _positionCode= data[3]
        _positionName = data[4];
        _deparmentCode = data[5];
        // alert('You clicked on ' + data[0] + '\'s row');
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $('#btnAddNew').click(function() {
    //    var data=[];
    //    var datarow={};
    //     var row=table.rows().data();
    //     for(let  i  = 0 ; i < row.length; i++){
    //         datarow.name=row[i][0];
    //         datarow.fullname=JSON.stringify(row[i][1]);
    //         data.push(datarow);
    //         datarow={};
    //     }
    //     console.log(data);

        //show modal
        $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitInsert");
        $('#txtUserName').removeAttr("readonly") 
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtUserName').focus();
        }) 
        resetForm();
    });

    $('#btnedit').click(function() {
   
        editData();
    });

    $('#btnSave').click(function(e) {
        e.preventDefault();
        // console.log('select_link clicked');
        saveData();
    });

    $('#btnDeleteId').click((e) =>{
        e.preventDefault();
        if (!confirm("Are you sure you want to Delete selected row?")){
        }else{
            deleteData();
        }
      
    })

    $('#btnRsPassId').click((e) =>{
        e.preventDefault();
        if (!confirm("Bạn muốn cài đặt lại mật khẩu mặc định?")){
        }else{
            RefreshPass();
        }
      
    })

    
});

$(`.mydatatable`).DataTable({
    scrollY: 320,
    scrollX: true,
    scrollCollapse: true,
    paging: false,
    // "bSort": false
    "order": [],
    "columnDefs": [
        {
            "targets": [ 3 ],
            "visible": false,
            // "searchable": false
        },
        // {
        //     "targets": [ 3 ],
        //     "visible": false
        // }
    ]
    // lengthChange: true,
    // pagingType: full_numbers,

    // initComplete:function () {
    //     //fillter
    //     this.api().columns().every( function () {
    //         var column=this;
    //         var select= $(`<select><option value=""> </option></select>`)
    //         .appendTo($(column.header()).empty() )
    //         .on( 'change', function () {
    //             var val = $.fn.DataTable.util.escapeRegex(
    //                 $(this).val()
    //             );

    //             column
    //             .search( val ? '^'+val+'$' : '', true, false )
    //             .draw();
    //         } );

    //         column.data().unique().sort().each( function (d, j){
    //             select.append( '<option value="'+d+'">'+d+'</option>')
    //         });

    //     });
    // },
    //fillter
});