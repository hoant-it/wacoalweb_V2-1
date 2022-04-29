$(document).ready(function() {
    document.getElementById("btnNewId").hidden = true;
    document.getElementById("btnEditId").hidden = true;
    document.getElementById("btnDeleteId").hidden = true;
    document.getElementById("btnSaveId").hidden = true;
    document.getElementById("btnCancelId").hidden = true;
    });


$(`.mydatatable`).DataTable({
    scrollY:340,
    scrollX: true,
    scrollCollapse: false,
    paging: false,
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
    "footerCallback": function ( row, data, start, end, display ) {
        var api = this.api(), data;

        // Remove the formatting to get integer data for summation
        var intVal = function ( i ) {
            return typeof i === 'string' ?
                i.replace(/[\$,]/g, '')*1 :
                typeof i === 'number' ?
                    i : 0;
        };

        // // Total over this page
        // pageTotal = api
        //     .column( 4, { page: 'current'} )
        //     .data()
        //     .reduce( function (a, b) {
        //         return intVal(a) + intVal(b);
        //     }, 0 );

        totalQty = api            .column( 8 )
            .data()
            .reduce( function (a, b) {
                return intVal(a) + intVal(b);
            }, 0 );
            $( api.column( 8 ).footer() ).html(
                // '$'+pageTotal +
                totalQty 
            );
        // Total over all pages
        totalR60 = api
            .column( 9 )
            .data()
            .reduce( function (a, b) {
                return intVal(a) + intVal(b);
            }, 0 );
        // Update footer
        $( api.column( 9 ).footer() ).html(
            // '$'+pageTotal +
            totalR60 
        );
        totalWA = api
            .column( 10 )
            .data()
            .reduce( function (a, b) {
                return intVal(a) + intVal(b);
            }, 0 );
        // Update footer
        $( api.column( 10 ).footer() ).html(
            // '$'+pageTotal +
            totalWA 
        );

        totalWB = api
            .column( 11 )
            .data()
            .reduce( function (a, b) {
                return intVal(a) + intVal(b);
            }, 0 );
        // Update footer
        $( api.column( 11 ).footer() ).html(
            // '$'+pageTotal +
            totalWB 
        );

        totalGoMu = api
            .column( 12 )
            .data()
            .reduce( function (a, b) {
                return intVal(a) + intVal(b);
            }, 0 );
        // Update footer
        $( api.column( 12 ).footer() ).html(
            // '$'+pageTotal +
            totalGoMu 
        );

        totalK60 = api
        .column( 13 )
        .data()
        .reduce( function (a, b) {
            return intVal(a) + intVal(b);
        }, 0 );
    // Update footer
    $( api.column( 13 ).footer() ).html(
        // '$'+pageTotal +
        totalK60 
    );

        totalK80 = api
        .column( 14 )
        .data()
        .reduce( function (a, b) {
            return intVal(a) + intVal(b);
        }, 0 );
    // Update footer
    $( api.column( 14 ).footer() ).html(
        // '$'+pageTotal +
        totalK80 
    );

        totalNW300 = api
        .column( 15 )
        .data()
        .reduce( function (a, b) {
            return intVal(a) + intVal(b);
        }, 0 );
    // Update footer
    $( api.column( 15 ).footer() ).html(
        // '$'+pageTotal +
        totalNW300 
    );

    totalNWS80 = api
        .column( 16 )
        .data()
        .reduce( function (a, b) {
            return intVal(a) + intVal(b);
        }, 0 );
    // Update footer
    $( api.column( 16 ).footer() ).html(
        // '$'+pageTotal +
        totalNWS80 
    );
    
    }
    });