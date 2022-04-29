var _companyCode = '';
var _companyName = '';
var _adrress='';
var _phoneNumber='';
var _fax='';
var _personRepresent='';
var _positions='';
var _bankName='';
var _bankAddress='';
var _bankAccount='';
var _maSoThue='';
var _tax='';
var _email='';

const editData = () => {
         //show modal
 
     $('#btnSave').val("submitEdit");
     $('#txtCompanyCode').val(_companyCode);
     $('#txtCompanyName').val(_companyName);
     $('#txtAdrress').val(_adrress);
     $('#txtPhoneNumber').val(_phoneNumber);
     $('#txtFax').val(_fax);
     $('#txtPersonRepresent').val(_personRepresent);
     $('#txtPositions').val(_positions);
     $('#txtBankName').val(_bankName);
     $('#txtBankAddress').val(_bankAddress);
     $('#txtBankAccount').val(_bankAccount);
     $('#txtMaSoThue').val(_maSoThue);
     $('#txtTax').val(_tax);
     $('#txtEmail').val(_email);
     $('#modalAddUpdate').modal('show');
     $('#txtCompanyCode').attr("readonly","true") 
     $('#modalAddUpdate').on('shown.bs.modal', function () {
        $('#txtCompanyName').focus();
     }) 
 
}
const resetForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitInsert");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtCompanyCode').focus();
        }) 
    $('#txtCompanyCode').removeAttr("readonly") 
    $('#txtCompanyCode').val('');
    $('#txtCompanyName').val('');
    $('#txtAdrress').val('');
    $('#txtPhoneNumber').val('');
    $('#txtFax').val('');
    $('#txtPersonRepresent').val('');
    $('#txtPositisons').val('');
    $('#txtBankName').val('');
    $('#txtBankAddress').val('');
    $('#txtBankAccount').val('');
    $('#txtMaSoThue').val('');
    $('#txtTax').val('');
    $('#txtEmail').val('');
}

const saveData = () => {
    // console.log("save ne");
        var companyCode = $('#txtCompanyCode').val();
        var companyName = $('#txtCompanyName').val();
        var adrress = $('#txtAdrress').val();
        var phoneNumber=$('#txtPhoneNumber').val();
        var fax=$('#txtFax').val();
        var personRepresent=$('#txtPersonRepresent').val();
        var positions=$('#txtPositions').val();
        var bankName=$('#txtBankName').val();
        var bankAdrress=$('#txtBankAddress').val();
        var bankAccount=$('#txtBankAccount').val();
        var maSoThue=$('#txtMaSoThue').val();
        var tax=$('#txtTax').val();
        var email= $('#txtEmail').val()
        var status=$('#btnSave').val();
// console.log(` companyCode ${companyCode} companyName ${companyName} adrress ${adrress} phoneNumber ${phoneNumber} fax: ${fax}
// personRepresent ${personRepresent} positions ${positions} bankName ${bankName} bankAdrress ${bankAdrress} bankAccount ${bankAccount} maSoThue ${maSoThue}
// tax ${tax} email ${email} status ${status}
// `);

   
        var data = {
            CompanyCode: companyCode,
            CompanyName: companyName,
            Adrress: adrress,
            PhoneNumber:phoneNumber,
            Fax:fax,
            PersonRepresent:personRepresent,
            Positions:positions,
            BankName:bankName,
            BankAddress:bankAdrress,
            BankAccount:bankAccount,
            MaSoThue:maSoThue,
            Tax:tax,
            Email:email,
            Status:status
        };

        // data.Name=singleValues;
        // data.title = "title";
        // data.message = "message";
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/admin/company',
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
            CompanyCode:_companyCode,
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/admin/company/DeleteCompany',
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
// console.log("window.location.href " + window.location.href);
// console.log("window.location.hostname " + window.location.hostname);
// console.log("window.location.pathname " + window.location.pathname);
// console.log("window.location.protocol " + window.location.protocol);
// console.log("window.location.assign() " + window.location.assign());

    var table = $('.mydatatable').DataTable();
    $('.mydatatable tbody').on('click', 'tr', function() {
        var data = table.row(this).data();
        _companyCode = data[0];
        _companyName = data[1];
        _adrress=data[2];
        _phoneNumber=data[3];
        _fax=data[4];
        _personRepresent=data[5];
        _positions=data[6];
        _bankName=data[7]
        _bankAddress=data[8]
        _bankAccount=data[9]
        _maSoThue=data[10]
        _tax=data[11]
        _email=data[14]
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
            "targets": [12],
            "visible": false,
            "searchable": false
        },
        {
            "targets": [13],
            "visible": false,
            "searchable": false
        },
        {
            "targets": [15],
            "visible": false,
            "searchable": false
        },
        {
            "targets": [16],
            "visible": false,
            "searchable": false
        },
        {
            "targets": [17],
            "visible": false,
            "searchable": false
        },
        {
            "targets": [18],
            "visible": false,
            "searchable": false
        },
        {
            "targets": [19],
            "visible": false,
            "searchable": false
        },
        {
            "targets": [20],
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