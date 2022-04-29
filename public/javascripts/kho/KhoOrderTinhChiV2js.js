
$(document).ready(function() {
    document.getElementById("btnNewId").hidden = true;
    document.getElementById("btnEditId").hidden = true;
    document.getElementById("btnDeleteId").hidden = true;
    document.getElementById("btnSaveId").hidden = true;
    document.getElementById("btnCancelId").hidden = true;
    });
    var table = $('.mydatatable').DataTable({
        dom: 'Bfrtip',//bat tinh nang su dung cac nut copy,export excel, pdf
        scrollY:320, // bat tinh nang scroll chieu dai
        deferRender:    true,
        scroller:       true,
        
        scrollX: true,// bat tinh nang scroll chieu rong
        scrollCollapse: true,
        paging: true,//bat tinh nang chia trang
        lengthChange: false,// tinh nang show so dong tren table
        order:[],
        buttons: [ 
            // 'copy',
        {
            // extend: 'excel',
            extend: 'excelHtml5',
            text: 'Xuất Excel',
            // header: false,
            // messageTop :'',//them dong tren cung (duoi title ) cua file excel
            // messageBottom:null ,// them dong duoi cung cua file excel
            title :'',//khong hien thi title khi xuat file excel
            customize: function (xlsx) {
                function _createNode(doc, nodeName, opts) {
                    var tempNode = doc.createElement(nodeName);
                    if (opts) {
                        if (opts.attr) {
                            $(tempNode).attr(opts.attr);
                        }
                        if (opts.children) {
                            $.each(opts.children, function (key, value) {
                                tempNode.appendChild(value);
                            });
                        }
                        if (opts.text !== null && opts.text !== undefined) {
                            tempNode.appendChild(doc.createTextNode(opts.text));
                        }
                    }
                    return tempNode;
                }

                var sheet = xlsx.xl.worksheets['sheet1.xml'];

                function mergeFunction(referenceString = false) {
                    // reference string format: 'B1:E1'
                    var mergeCells = $('mergeCells', sheet);
                    // var rows = $('row', sheet);
                    if (!referenceString) {
                        alert('no reference string on merge function call');
                        return
                    }
                    mergeCells[0].appendChild(_createNode(sheet, 'mergeCell', {
                        attr: {
                            ref: referenceString
                        }
                    }));
                    mergeCells.attr('count', mergeCells.attr('count') + 1);
                }
         

                // $(`row:nth-child(2) c`, sheet).attr('s', '67'); // custom style
         
                var numrows = 6;
                var clR = $('row', sheet);

                //update Row
                clR.each(function () {
                    var attr = $(this).attr('r');
                    var ind = parseInt(attr);
                    ind = ind + numrows;
                    $(this).attr("r",ind);
                });

                // Create row before data
                $('row c ', sheet).each(function () {
                    var attr = $(this).attr('r');
                    var pre = attr.substring(0, 1);
                    var ind = parseInt(attr.substring(1, attr.length));
                    ind = ind + numrows;
                    $(this).attr("r", pre + ind);
                   
                });

                function Addrow(index,data) {
                    msg='<row r="'+index+'">'
                    for(i=0;i<data.length;i++){
                        var key=data[i].key;
                        var value=data[i].value;

                        // mergeCells( index, colRange, sheet );
                        msg += '<c t="inlineStr" r="' + key + index + '" s="2">';
                        msg += '<is>';
                        msg +=  '<t>'+value+'</t>';
                        msg+=  '</is>';
                        msg+='</c>';
                    }
                    msg += '</row>';
                    return msg;
                }
                $('c[r=A1]', sheet).attr('s','2');
                // $(this).attr("s", '2');
                //insert
                var r1 = Addrow(1, [{ key: 'A', value: 'FROM' }, { key: 'B', value: 'VIETNAM WACOAL' }]);
                var r2 = Addrow(2, [{ key: 'A', value: 'TO' }, { key: 'B', value: 'WACOAL CORP.' }]);
                var r3 = Addrow(3, [{ key: 'A', value: 'ATTN' }, { key: 'E', value: 'ORDER THREAD' }]);
                var r4 = Addrow(4, [{ key: 'A', value: '' }, { key: 'B', value: '' }]);
                var r5 = Addrow(5, [{ key: 'A', value: 'ORDER' }, { key: 'E', value: '' }]);
                var r6 = Addrow(6, [
                    { key: 'A', value: 'R60' },
                    { key: 'C', value: 'WA' },
                    { key: 'E', value: 'WB' },
                    { key: 'G', value: 'WB' },
                    { key: 'I', value: 'S80' },
                    { key: 'K', value: 'K60' },
                    { key: 'M', value: 'GOMU' },
                    { key: 'O', value: 'K80' },
                     ]);
                     mergeFunction(`A6:B6`);
                     mergeFunction(`C6:D6`);
                     mergeFunction(`E6:F6`);
                     mergeFunction(`G6:H6`);
                     mergeFunction(`I6:J6`);
                     mergeFunction(`K6:L6`);
                     mergeFunction(`M6:N6`);
                     mergeFunction(`O6:P6`);
                     $('row:first c', sheet).attr( 's', '2' ); 

                sheet.childNodes[0].childNodes[1].innerHTML = r1 + r2 + r3 + r4 + r5 + r6 + sheet.childNodes[0].childNodes[1].innerHTML;
            }
        }
        //  'excel',
         
         
        //   'pdf',
        //    'colvis'
         ],

        
    
        // colReorder: true, //di chuyen cot tren table https://cdn.datatables.net/colreorder/1.5.3/js/dataTables.colReorder.min.js
        // autoFill: true ,//giong ctrl+D tren excel https://cdn.datatables.net/autofill/2.3.5/js/dataTables.autoFill.min.js
    
        // colReorder: true //doi vi tri cot tren table https://cdn.datatables.net/colreorder/1.5.3/js/dataTables.colReorder.min.js
    
        //giu nguyen cot khong di chuyen khi scroll ngang https://cdn.datatables.net/fixedcolumns/3.3.2/js/dataTables.fixedColumns.min.js
        // fixedColumns:   {
        //     leftColumns: 1,
        //     rightColumns: 1
        // }
    
        // keys: true // focus cell  https://cdn.datatables.net/keytable/2.6.0/js/dataTables.keyTable.min.js
    
        //row group https://cdn.datatables.net/rowgroup/1.1.2/js/dataTables.rowGroup.min.js
        // order: [[2, 'asc']],
        // rowGroup: {
        //     dataSrc: 2
        // }
    
        // rowReorder: true //di chuyen dong tren table https://cdn.datatables.net/rowreorder/1.2.7/js/dataTables.rowReorder.min.js
    
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
    table.buttons().container()
    .appendTo( ' .col-sm-6:eq(0)' );

    $(document).ready(function() {

        $('a.toggle-vis').on( 'click', function (e) {
            e.preventDefault();
     
            // Get the column API object
            var column = table.column( $(this).attr('data-column') );
     
            // Toggle the visibility
            column.visible( ! column.visible() );
        } );



        });
       