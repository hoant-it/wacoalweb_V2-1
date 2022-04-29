
    $(document).ready(function() {
        var table = $('.mydatatable').DataTable();
        $('.mydatatable tbody').on('click', 'tr', function() {
            var data = table.row(this).data();
            document.getElementById("codeID").readOnly=true;
            document.getElementById("codeID").value = data[0];
            document.getElementById("nameVNId").value = data[1];
            document.getElementById("nameENID").value = data[2];
        // alert('You clicked on ' + data[0] + '\'s row');
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });

        $('a.toggle-vis').on( 'click', function (e) {
            e.preventDefault();
     
            // Get the column API object
            var column = table.column( $(this).attr('data-column') );
     
            // Toggle the visibility
            column.visible( ! column.visible() );
        } );



        });

        document.getElementById("btnCancelId").disabled = true;


function New() {
    document.getElementById("codeID").readOnly=false;
    document.getElementById("codeID").value = "";
    document.getElementById("nameVNId").value = "";
    document.getElementById("nameENID").value = "";
    document.getElementById("btnDeleteId").disabled = true;
    document.getElementById("btnNewId").disabled = true;
    document.getElementById("btnCancelId").disabled = false;
    document.getElementById("btnSaveId").value = "submitAdd";
    disableDatatable();
}

 const Cancel = () => {
    document.getElementById("codeID").value = "";
    document.getElementById("nameVNId").value = "";
    document.getElementById("nameENID").value = "";
    document.getElementById("btnDeleteId").disabled = false;
    document.getElementById("btnNewId").disabled = false;
    // document.getElementById("btnSaveId").disabled = true;
    document.getElementById("btnCancelId").disabled = true;
    enableDatatable();
};


var table= $(`.mydatatable`).DataTable({
scrollY:320,
scrollX: true,
scrollCollapse: true,
paging: false,

"order": [[ 4, "desc" ], [ 3, "desc" ]],
"columnDefs": [
    {
        "targets": [ 4 ],
        "visible": false,
        "searchable": false
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

table.column(2).visible(false);



const enableDatatable = () => {
    $(document).ready(function() {
        var table = $('.mydatatable').DataTable();
        $('.mydatatable tbody').on('click', 'tr', function() {
            var data = table.row(this).data();
            document.getElementById("codeID").value = data[0];
            document.getElementById("nameVNId").value = data[1];
            document.getElementById("nameENID").value = data[2];
        // alert('You clicked on ' + data[0] + '\'s row');
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
        });
}

const disableDatatable = () =>{
    $(document).ready(function() {
    var table = $('.mydatatable').DataTable();
$('.mydatatable tbody').on('click', 'tr', function() {
    var data = table.row(this).data();
        document.getElementById("codeID").value = "";
        document.getElementById("nameVNId").value = "";
        document.getElementById("nameENID").value = "";
// alert('You clicked on ' + data[0] + '\'s row');
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    } else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
});
});
}

document.getElementById("btnDeleteId").addEventListener("click", function(evt) {
    if (!confirm("Are you sure you want to Delete selected row?")) { 
     evt.preventDefault();
    }
     });
