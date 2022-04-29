var _departmentCode = '';
var _departmentName = '';
var _companyCode='';

const editData = () => {
         //show modal
 
     $('#btnSave').val("submitEdit");
     $('#txtDepartmentCode').val(_departmentCode);
     $('#txtDepartmentName').val(_departmentName);
     $('#selectCompany').val(_companyCode);
     $('#modalAddUpdate').modal('show');
    //  $('#txtDepartmentCode').attr("readonly","true") 
     $('#modalAddUpdate').on('shown.bs.modal', function () {
        $('#txtDepartmentName').focus();
     }) 
 
}
const resetForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitInsert");
        // $('#txtMenuCode').removeAttr("readonly") 
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtDepartmentCode').focus();
        }) 
    $('#txtDepartmentCode').val('');
    $('#txtDepartmentName').val('');
}

const saveData = () => {
        var departmentCode = $('#txtDepartmentCode').val();
        var departmentName = $('#txtDepartmentName').val();
        var companyCode = $('#selectCompany').val();
        var status=$('#btnSave').val();
        // console.log(status);
        var data = {
            DepartmentCode: departmentCode,
            DepartmentName: departmentName,
            CompanyCode: companyCode,
            Status:status
        };

        // data.Name=singleValues;
        // data.title = "title";
        // data.message = "message";
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/admin/department',
            success: function(res) {
                if (res=== 'ok') {
                    // console.log('success');
                    console.log(JSON.stringify(res));
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
            DepartmentCode:_departmentCode,
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/admin/department/DeleteDepartment',
            success: (res) =>{
                if(res.mes==='ok'){
                    // console.log(JSON.stringify(res));
                    alert("sucess");
                    location.reload();
                }
                else{
                    alert(res.send);
                }
            }
        });
    }

    //ham khoi tao: goi tat ca cac ham khac trong day
$(document).ready(function() {
    var table = $('.mydatatable').DataTable();
    $('.mydatatable tbody').on('click', 'tr', function() {
        var data = table.row(this).data();
        _departmentCode = data[0];
        _departmentName = data[1];
        _companyCode=data[2];
        // alert('You clicked on ' + data[0] + '\'s row');
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $('#btnAddNew').click(function() {
      
        // console.log('test ' +test);
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

   
    


});

$(`.mydatatable`).DataTable({
    scrollY: 350,
    scrollX: true,
    scrollCollapse: true,
    paging: true,
    // "bSort": false
    "order": [],
    "columnDefs": [
        {
            "targets": [2],
            "visible": false,
            "searchable": false
        },

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