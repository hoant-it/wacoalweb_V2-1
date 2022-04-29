



const GridviewMaHangMissLoad = (oderNo,khachHang) => {
    var url = "/api/khoOrderTinhchiGridviewMaHangMiss/";
    // console.log(" url " + url + oderNo+khachHang);
    var arrMaHangmiss = DevExpress.data.AspNet.createStore({
        key: "MAHANG",
        loadUrl: url  + oderNo +'/'+khachHang,
       
        // insertUrl: url + "/InsertOrder",
        // updateUrl: url + "/UpdateOrder",
        // deleteUrl: url + "/DeleteOrder",
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })


    $("#GridTinhChi").dxDataGrid({
        dataSource: arrMaHangmiss,
        // reshapeOnPush: true,
        columnsAutoWidth: true,
        height: 450,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
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
        // searchPanel: {
        //     visible: true,
        //     highlightCaseSensitive: true,
        //     // width: 240,
        //     // placeholder: "Search..."
        // },
        // headerFilter: {
        //     visible: false
        // },
        // groupPanel: {
        //     visible: false
        // },
        scrolling: {
            mode: "virtual"
        },
        //phan trang
        // paging: {
        //     pageSize: 10
        // },
        columns: ["MAHANG"],

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
        // onFocusedRowChanged: function(e) {
        //     const menuCode = getMenuDataItem(e.row);
        //     _sourceDataTask_ID = menuCode.menuCode;
        //     // console.log("menuCode.subject " + menuCode.menuCode);
        //     // const focusedRowKey = e.component.option("focusedRowKey");
        // }
    }).dxDataGrid("instance");

}

const GridviewOrderLoad = (oderNo,khachHang) => {
    // var url = "/api/khoOrderTinhchiGridview/";
    var url = "khoOrderTinhchiGridview/";
    
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        key: "numberLoaichi",
        loadUrl: url  + oderNo +'/'+khachHang,
       
        // insertUrl: url + "/InsertOrder",
        // updateUrl: url + "/UpdateOrder",
        // deleteUrl: url + "/DeleteOrder",
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridTinhChi").dxDataGrid({
        dataSource: listTinhChi,
        // reshapeOnPush: true,
        columnsAutoWidth: true,
        height: 450,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        export:{
            enabled: true
        },
        onExporting: function(e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet(`FORMAT ĐẶT CHỈ_${oderNo}_${khachHang}`);
            
            DevExpress.excelExporter.exportDataGrid({
              component: e.component,
              worksheet: worksheet,
              topLeftCell: { row: 6, column: 1 },
              customizeCell: function(options) {
                var gridCell = options.gridCell;
                var excelCell = options.excelCell;
                
                if(gridCell.rowType === "data") {
                    if(gridCell.column.dataField.includes("COLOR")) {
                        // excelCell.value = parseInt(gridCell.value);
                        // excelCell.numFmt = excelCell.value===0?'-':excelCell.value;
                        excelCell.alignment = { horizontal: 'left' };
                      }
                      if(gridCell.column.dataField.includes("SL")) {
                        excelCell.value = parseInt(gridCell.value);
                        excelCell.numFmt = "0;-0;-;@";
                        excelCell.alignment = { horizontal: 'right' };
                      }
                    // if(gridCell.column.dataField === 'SL_R60') {
                    //     excelCell.value = parseInt(gridCell.value);
                    //     excelCell.numFmt = "0;-0;-;@";
                    //     excelCell.alignment = { horizontal: 'right' };
                    //   }
                    //   if(gridCell.column.dataField === 'SL_WA') {
                    //     excelCell.value = parseInt(gridCell.value);
                    //     excelCell.numFmt = "0;-0;-;@";
                    //     excelCell.alignment = { horizontal: 'right' };
                    //   }
                    //   if(gridCell.column.dataField === 'SL_WB') {
                    //     excelCell.value = parseInt(gridCell.value);
                    //     excelCell.numFmt = "0;-0;-;@";
                    //     excelCell.alignment = { horizontal: 'right' };
                    //   }
                    //   if(gridCell.column.dataField === 'SL_W300') {
                    //     excelCell.value = parseInt(gridCell.value);
                    //     excelCell.numFmt = "0;-0;-;@";
                    //     excelCell.alignment = { horizontal: 'right' };
                    // }
                    // if(gridCell.column.dataField === 'SL_S80') {
                    //     excelCell.value = parseInt(gridCell.value);
                    //     excelCell.numFmt = excelCell.value===0?'-':excelCell.value;
                    //     excelCell.alignment = { horizontal: 'right' };
                    //   }
                    //   if(gridCell.column.dataField === 'SL_K60') {
                    //     excelCell.value = parseInt(gridCell.value);
                    //     excelCell.numFmt = excelCell.value===0?'-':excelCell.value;
                    //     excelCell.alignment = { horizontal: 'right' };
                    //   }
                    //   if(gridCell.column.dataField === 'SL_GOMU') {
                    //     excelCell.value = parseInt(gridCell.value);
                    //     excelCell.numFmt = excelCell.value===0?'-':excelCell.value;
                    //     excelCell.alignment = { horizontal: 'right' };
                    //   }
                    //   if(gridCell.column.dataField === 'SL_K80') {
                    //     excelCell.value = parseInt(gridCell.value);
                    //     excelCell.numFmt = excelCell.value===0?'-':excelCell.value;
                    //     excelCell.alignment = { horizontal: 'right' };
                    //   }

                //   if(gridCell.column.dataField === 'Website') {
                //     excelCell.value = { text: gridCell.value, hyperlink: gridCell.value };
                //     excelCell.font = { color: { argb: 'FF0000FF' }, underline: true };
                //     excelCell.alignment = { horizontal: 'left' };
                //   }
                }
                // if(gridCell.rowType === "group") {
                //   excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "BEDFE6" } };
                // }
                if(gridCell.rowType === "totalFooter" ) {
                //   excelCell.font.italic = true;
                  excelCell.alignment= { horizontal: 'right' };
                }
              }

            }).then(function(cellRange) {
              // header
              var headerRowFROM = worksheet.getRow(1);
            //   headerRowFROM.height = 30;
              worksheet.mergeCells(1, 1, 1, 1);
              headerRowFROM.getCell(1).value = 'FROM';
              headerRowFROM.getCell(1).font = { name: 'Arial', size: 10 };
              headerRowFROM.getCell(1).alignment = { horizontal: 'left' };

              var headerRowVnWacoal = worksheet.getRow(1);
              //   headerRowFROM.height = 30;
                worksheet.mergeCells(1, 2, 1, 3);
                headerRowVnWacoal.getCell(2).value = 'VIETNAM WACOAL';
                headerRowVnWacoal.getCell(2).font = { name: 'Arial', size: 10 };
                headerRowVnWacoal.getCell(2).alignment = { horizontal: 'left' };
                
              var headerRowTo = worksheet.getRow(2);
                //   headerRowFROM.height = 30;
                  worksheet.mergeCells(2, 1, 2, 1);
                  headerRowTo.getCell(1).value = 'TO';
                  headerRowTo.getCell(1).font = { name: 'Arial', size: 10 };
                  headerRowTo.getCell(1).alignment = { horizontal: 'left' }; 

              var headerRow2c2 = worksheet.getRow(2);
                  //   headerRowFROM.height = 30;
                  worksheet.mergeCells(2, 2, 2, 3);
                  headerRow2c2.getCell(2).value = 'WACOAL CORP.';
                  headerRow2c2.getCell(2).font = { name: 'Arial', size: 10 };
                  headerRow2c2.getCell(2).alignment = { horizontal: 'left' };

              var headerRow3c1 = worksheet.getRow(3);
                    //   headerRowFROM.height = 30;
                    worksheet.mergeCells(3, 1, 3, 1);
                    headerRow3c1.getCell(1).value = 'ATTN';
                    headerRow3c1.getCell(1).font = { name: 'Arial', size: 10 };
                    headerRow3c1.getCell(1).alignment = { horizontal: 'left' }; 

             var headerRow3c5 = worksheet.getRow(3);
                      //   headerRowFROM.height = 30;
                     worksheet.mergeCells(3, 5, 3, 8);
                     headerRow3c5.getCell(5).value = 'ORDER THREAD';
                     headerRow3c5.getCell(5).font = { name: 'Arial', size: 16 ,bold:true};
                     headerRow3c5.getCell(5).alignment = { horizontal: 'left' };  

                var headerRow5c1 = worksheet.getRow(5);
                     worksheet.mergeCells(5, 1, 5, 1);
                     headerRow5c1.getCell(1).value = 'ORDER';
                     headerRow5c1.getCell(1).font = { name: 'Arial', size: 10 };
                     headerRow5c1.getCell(1).alignment = { horizontal: 'left' };   
                        
                var headerRow5c2 = worksheet.getRow(5);
                     worksheet.mergeCells(5, 2, 5, 3);
                     headerRow5c2.getCell(2).value = oderNo;
                     headerRow5c2.getCell(2).font = { name: 'Arial', size: 10 };
                     headerRow5c2.getCell(2).alignment = { horizontal: 'left' };
                 var headerRow5c4 = worksheet.getRow(5);
                     worksheet.mergeCells(5, 4, 5, 4);
                     headerRow5c4.getCell(4).value = khachHang;
                     headerRow5c4.getCell(4).font = { name: "Arial", size: 10 };
                     headerRow5c4.getCell(4).alignment = { horizontal: "left" };    
              
              // footer
            //   var footerRowIndex = cellRange.to.row + 2;
            //   var footerRow = worksheet.getRow(footerRowIndex);
            //   worksheet.mergeCells(footerRowIndex, 1, footerRowIndex, 8);
              
            //   footerRow.getCell(1).value = 'www.wikipedia.org';
            //   footerRow.getCell(1).font = { color: { argb: 'BFBFBF' }, italic: true };
            //   footerRow.getCell(1).alignment = { horizontal: 'right' };
         
            }).then(function() {
              workbook.xlsx.writeBuffer().then(function(buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `Datchi_${oderNo}_${khachHang}.xlsx`);
              });
            });
            e.cancel = true;
          },
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
        // searchPanel: {
        //     visible: true,
        //     highlightCaseSensitive: true,
        //     // width: 240,
        //     // placeholder: "Search..."
        // },
        // headerFilter: {
        //     visible: false
        // },
        // groupPanel: {
        //     visible: false
        // },
        scrolling: {
            mode: "virtual"
        },
        //phan trang
        // paging: {
        //     pageSize: 10
        // },
        columns: [
            {
                caption: "R60",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_R60",
                    format: "string"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_R60",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            },
            {
                caption: "WA",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_WA",
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_WA",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            }
            ,
            {
                caption: "WB",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_WB",
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_WB",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            }
            ,
            {
                caption: "W300",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_W300",
                  
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_W300",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            } ,
            {
                caption: "KS60",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_KS60",
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_KS60",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            } ,
            {
                caption: "UN420",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_UN420",
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_UN420",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            } ,
            {
                caption: "UN280",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_UN280",
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_UN280",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            } ,
            // {
            //     caption: "GOMU",
            //     alignment:"center",
            //     columns: [{
            //         caption: "COLOR",
            //         alignment:"center",
            //         dataField: "COLOR_GOMU",
            //         // format: "fixedPoint"
            //     }, {
            //         caption: "QTY",
            //         alignment:"center",
            //         dataField: "SL_GOMU",
            //         // format: function(value) {
            //         //     return value==0?'-':value;
            //         //   }
            //         // format: "percent"
            //     }]
            // } ,
            {
                caption: "R50",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_R50",
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_R50",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            } ,
            {
                caption: "300W",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_300W",
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_300W",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            } ,
        ],
        summary: {
            totalItems: [{
                column: "COLOR_R60",
                summaryType: "count",
                customizeText: function(data) {
                    return "Total";
                }},
                {column: "SL_R60",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
                {column: "SL_WA",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
                {column: "SL_WB",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
                {column: "SL_W300",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
                {column: "SL_KS60",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
                // {column: "SL_GOMU",
                // summaryType: "sum",
                // customizeText: function(data) {
                //     return data.value;
                // }},
                {column: "SL_UN420",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
                {column: "SL_UN280",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
               {column: "SL_R50",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
                {column: "SL_300W",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
        ]
        },
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
        // onFocusedRowChanged: function(e) {
        //     const menuCode = getMenuDataItem(e.row);
        //     _sourceDataTask_ID = menuCode.menuCode;
        //     // console.log("menuCode.subject " + menuCode.menuCode);
        //     // const focusedRowKey = e.component.option("focusedRowKey");
        // }
    }).dxDataGrid("instance");

}
const GridviewMaHangLoad = (oderNo,khachHang) => {
    var url = "wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V2/";
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        key: "keyMAHANG",
        loadUrl: url  + oderNo+'/'+khachHang ,
       
        // insertUrl: url + "/InsertOrder",
        // updateUrl: url + "/UpdateOrder",
        // deleteUrl: url + "/DeleteOrder",
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridTinhChiCT").dxDataGrid({
        dataSource: listTinhChi,
        // reshapeOnPush: true,
        columnsAutoWidth: true,
        height: 444,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        export:{
            enabled: true
        },
        onExporting: function(e) {

            console.log("exportting");
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('FORMAT ĐẶT CHỈ CHI TIẾT');
            
            DevExpress.excelExporter.exportDataGrid({
              component: e.component,
              worksheet: worksheet,
            //   topLeftCell: { row: 6, column: 1 },
              customizeCell: function(options) {
                var gridCell = options.gridCell;
                var excelCell = options.excelCell;
                
                if(gridCell.rowType === "data") {
                    if(gridCell.column.dataField.includes("COLOR")) {
                        // excelCell.value = parseInt(gridCell.value);
                        // excelCell.numFmt = excelCell.value===0?'-':excelCell.value;
                        excelCell.alignment = { horizontal: 'left' };
                      }
                      if(gridCell.column.dataField.includes("SL")) {
                        // excelCell.value = parseFloat(gridCell.value);
                        if(gridCell.value===0){
                            excelCell.numFmt = "-";
                        }
                        // excelCell.numFmt = "0;-0;-;@";
                        excelCell.alignment = { horizontal: 'right' };
                      }
                }
                // if(gridCell.rowType === "group") {
                //   excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "BEDFE6" } };
                // }
                if(gridCell.rowType === "totalFooter" ) {
                //   excelCell.font.italic = true;
                  excelCell.alignment= { horizontal: 'right' };
                }
              }
            })

            // }).then(function(cellRange) {
            //   // header
            //   var headerRowFROM = worksheet.getRow(1);
            // //   headerRowFROM.height = 30;
            //   worksheet.mergeCells(1, 1, 1, 1);
            //   headerRowFROM.getCell(1).value = 'FROM';
            //   headerRowFROM.getCell(1).font = { name: 'Arial', size: 10 };
            //   headerRowFROM.getCell(1).alignment = { horizontal: 'left' };

            //   var headerRowVnWacoal = worksheet.getRow(1);
            //   //   headerRowFROM.height = 30;
            //     worksheet.mergeCells(1, 2, 1, 3);
            //     headerRowVnWacoal.getCell(2).value = 'VIETNAM WACOAL';
            //     headerRowVnWacoal.getCell(2).font = { name: 'Arial', size: 10 };
            //     headerRowVnWacoal.getCell(2).alignment = { horizontal: 'left' };
                
            //   var headerRowTo = worksheet.getRow(2);
            //     //   headerRowFROM.height = 30;
            //       worksheet.mergeCells(2, 1, 2, 1);
            //       headerRowTo.getCell(1).value = 'TO';
            //       headerRowTo.getCell(1).font = { name: 'Arial', size: 10 };
            //       headerRowTo.getCell(1).alignment = { horizontal: 'left' }; 

            //   var headerRow2c2 = worksheet.getRow(2);
            //       //   headerRowFROM.height = 30;
            //       worksheet.mergeCells(2, 2, 2, 3);
            //       headerRow2c2.getCell(2).value = 'WACOAL CORP.';
            //       headerRow2c2.getCell(2).font = { name: 'Arial', size: 10 };
            //       headerRow2c2.getCell(2).alignment = { horizontal: 'left' };

            //   var headerRow3c1 = worksheet.getRow(3);
            //         //   headerRowFROM.height = 30;
            //         worksheet.mergeCells(3, 1, 3, 1);
            //         headerRow3c1.getCell(1).value = 'ATTN';
            //         headerRow3c1.getCell(1).font = { name: 'Arial', size: 10 };
            //         headerRow3c1.getCell(1).alignment = { horizontal: 'left' }; 

            //  var headerRow3c5 = worksheet.getRow(3);
            //           //   headerRowFROM.height = 30;
            //          worksheet.mergeCells(3, 5, 3, 8);
            //          headerRow3c5.getCell(5).value = 'ORDER THREAD';
            //          headerRow3c5.getCell(5).font = { name: 'Arial', size: 16 ,bold:true};
            //          headerRow3c5.getCell(5).alignment = { horizontal: 'left' };  

            //     var headerRow5c1 = worksheet.getRow(5);
            //          worksheet.mergeCells(5, 1, 5, 1);
            //          headerRow5c1.getCell(1).value = 'ORDER';
            //          headerRow5c1.getCell(1).font = { name: 'Arial', size: 10 };
            //          headerRow5c1.getCell(1).alignment = { horizontal: 'left' };   
                        
            //     var headerRow5c2 = worksheet.getRow(5);
            //          worksheet.mergeCells(5, 2, 5, 3);
            //          headerRow5c2.getCell(2).value = oderNo;
            //          headerRow5c2.getCell(2).font = { name: 'Arial', size: 10 };
            //          headerRow5c2.getCell(2).alignment = { horizontal: 'left' };
              
            //   // footer
            // //   var footerRowIndex = cellRange.to.row + 2;
            // //   var footerRow = worksheet.getRow(footerRowIndex);
            // //   worksheet.mergeCells(footerRowIndex, 1, footerRowIndex, 8);
              
            // //   footerRow.getCell(1).value = 'www.wikipedia.org';
            // //   footerRow.getCell(1).font = { color: { argb: 'BFBFBF' }, italic: true };
            // //   footerRow.getCell(1).alignment = { horizontal: 'right' };
            // })
            .then(function() {
              workbook.xlsx.writeBuffer().then(function(buffer) {
             
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'TinhChi_CT_'+oderNo+'_'+khachHang+'.xlsx');
              });
            });
            e.cancel = true;
          },
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
        // searchPanel: {
        //     visible: true,
        //     highlightCaseSensitive: true,
        //     // width: 240,
        //     // placeholder: "Search..."
        // },
        // headerFilter: {
        //     visible: false
        // },
        // groupPanel: {
        //     visible: false
        // },
        scrolling: {
            mode: "virtual"
        },
        //phan trang
        // paging: {
        //     pageSize: 10
        // },
        columns: [
            {
                caption: "MÃ HÀNG",
                alignment:"left",
                dataField: "MAHANG",
            },
            {
                caption: "MÀU MH",
                alignment:"left",
                dataField: "MAUMH",
            },
            {
                caption: "SL Order",
                alignment:"left",
                dataField: "OrderQty",
            },
            {
                caption: "KH Order",
                alignment:"left",
                dataField: "Note",
            },
          
            {
                caption: "R60",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"left",
                    dataField: "COLOR_R60",
                    format: "string"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_R60",
                    format: {
                        // type: 'percent',
                        precision: 1
                      }
                    // dataType: "number",
                    // format:"number"
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            },
            {
                caption: "WA",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_WA",
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_WA",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            }
            ,
            {
                caption: "WB",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_WB",
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_WB",
                    // dataType: "number",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            }
            ,
            {
                caption: "W300",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_W300",
                  
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_W300",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            } ,
         
            {
                caption: "KS60",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_KS60",
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_KS60",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            } ,
            {
                caption: "UN420",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_UN420",
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_UN420",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            } ,
            {
                caption: "UN280",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_UN280",
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_UN280",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            } ,
            // {
            //     caption: "GOMU",
            //     alignment:"center",
            //     columns: [{
            //         caption: "COLOR",
            //         alignment:"center",
            //         dataField: "COLOR_GOMU",
            //         // format: "fixedPoint"
            //     }, {
            //         caption: "QTY",
            //         alignment:"center",
            //         dataField: "SL_GOMU",
            //         // format: function(value) {
            //         //     return value==0?'-':value;
            //         //   }
            //         // format: "percent"
            //     }]
            // } ,
            {
                caption: "R50",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_R50",
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_R50",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            } ,
               {
                caption: "300W",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_300W",
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_300W",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            } ,
        ],
        summary: {
            totalItems: [{
                column: "COLOR_R60",
                summaryType: "count",
                customizeText: function(data) {
                    return "Total";
                }},
                {column: "SL_R60",
                summaryType: "sum",
                valueFormat: "Decimal",
                customizeText: function(data) {
                    return data.value;
                }},
           
                {column: "SL_WA",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
                {column: "SL_WB",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
                {column: "SL_W300",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
                {column: "SL_S80",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
                {column: "SL_KS60",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
                {column: "SL_UN420",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
                {column: "SL_UN280",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},

                // {column: "SL_GOMU",
                // summaryType: "sum",
                // customizeText: function(data) {
                //     return data.value;
                // }},
               {column: "SL_K80",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
                {column: "SL_R50",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
                {column: "SL_300W",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
        ]},
        // onFocusedRowChanging: function(e) {
        //     var rowsCount = e.component.getVisibleRows().length,
        //         pageCount = e.component.pageCount(),
        //         pageIndex = e.component.pageIndex(),
        //         key = e.event && e.event.key;

        //     if (key && e.prevRowIndex === e.newRowIndex) {
        //         if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
        //             e.component.pageIndex(pageIndex + 1).done(function() {
        //                 e.component.option("focusedRowIndex", 0);
        //             });
        //         } else if (e.newRowIndex === 0 && pageIndex > 0) {
        //             e.component.pageIndex(pageIndex - 1).done(function() {
        //                 e.component.option("focusedRowIndex", rowsCount - 1);
        //             });
        //         }
        //     }
        // },
        // onFocusedRowChanged: function(e) {
        //     const menuCode = getMenuDataItem(e.row);
        //     _sourceDataTask_ID = menuCode.menuCode;
        //     // console.log("menuCode.subject " + menuCode.menuCode);
        //     // const focusedRowKey = e.component.option("focusedRowKey");
        // }
    }).dxDataGrid("instance");

}

const searchBoxKhachHang=() =>{
    const selectBoxData =  DevExpress.data.AspNet.createStore({
        key: "GROUPKH",
        loadMode:"raw",
        loadUrl:"/api/Khowacoal_KHACHHANG_load_Web_V1",
    });

    var searchBox = $("#searchBoxKH").dxSelectBox({
        dataSource:selectBoxData,
        // DevExpress.data.AspNet.createStore({
        //     key: "MAKH",
        //     loadUrl: serviceUrl + "/Khowacoal_KHACHHANG_load_Web_V1",
        //     // insertUrl: serviceUrl + "/InsertAction"
        // }),
        displayExpr: "GROUPKH",
        valueExpr: "GROUPKH",
        searchEnabled: true,
        searchExpr:'GROUPKH',
        searchMode:'contains',
        searchTimeout:200,
        minSearchLength:0,
        showDataBeforeSearch:false,
        //       onValueChanged: function (data) {
        //     // var $result = $(".current-value");

        //     if (data.value !== null) {
        //         var selectedItem = data.component.option('selectedItem');
        //         // $result.text(selectedItem.Name + " (ID: " + selectedItem.ID + ")");
        //         console.log(" (ID: " + selectedItem.MAKH + ")")
        //     } else {
        //         console.log("Not selected")
        //         // $result.text("Not selected");
        //     }
        // },
    }).dxSelectBox("instance");
}

const searchBoxNam=() =>{
    const selectBoxData =  DevExpress.data.AspNet.createStore({
        key: "ORDERNO",
        loadMode:"raw",
        loadUrl:"wacoal_DONHANGHEAD_Load_Web_V1",
    });

    var searchBox = $("#searchBoxNam").dxSelectBox({
        dataSource:selectBoxData,
        // DevExpress.data.AspNet.createStore({
        //     key: "MAKH",
        //     loadUrl: serviceUrl + "/Khowacoal_KHACHHANG_load_Web_V1",
        //     // insertUrl: serviceUrl + "/InsertAction"
        // }),
        displayExpr: "ORDERNO",
        valueExpr: "ORDERNO",
        searchEnabled: true,
        searchExpr:'ORDERNO',
        searchMode:'contains',
        searchTimeout:200,
        minSearchLength:0,
        showDataBeforeSearch:false,
        //       onValueChanged: function (data) {
        //     // var $result = $(".current-value");

        //     if (data.value !== null) {
        //         var selectedItem = data.component.option('selectedItem');
        //         // $result.text(selectedItem.Name + " (ID: " + selectedItem.ID + ")");
        //         console.log(" (ID: " + selectedItem.MAKH + ")")
        //     } else {
        //         console.log("Not selected")
        //         // $result.text("Not selected");
        //     }
        // },
    }).dxSelectBox("instance");
}

$(function() {
    $("#btnNewId").hidden = true;
    $("#btnEditId").hidden = true;
    $("#btnDeleteId").hidden = true;
    $("#btnSaveId").hidden = true;
    $("#btnCancelId").hidden = true;
    searchBoxKhachHang();
    searchBoxNam();
    

    $('#btnSearchId').click((e) => {
        // console.log('click ne');
        e.preventDefault();
        var oderNo=$('#searchBoxNam').dxSelectBox('instance').option('value');
        var khachHang=$("#searchBoxKH").dxSelectBox('instance').option('value');
        // $('#selectKH').val();
        
//    console.log("searchBox" + $("#searchBox").dxSelectBox('instance').option('value'));
        var data={
                oderNo:oderNo,
                khachHang:khachHang
                };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/kho/KhoOderTinhChiGridViewDev',
            success: (res) =>{
              
                if(res.length>0){
                    alert("Một số Mã Hàng chưa liệt kê công đoạn theo mã Hàng. Vui Lòng kiểm tra tab chi tiết")
                    // GridviewMaHangMissLoad(oderNo,khachHang);
                    GridviewMaHangLoad(oderNo,khachHang)
                }
                else{
                    GridviewOrderLoad(oderNo,khachHang)
                    GridviewMaHangLoad(oderNo,khachHang)
                }
            }
        })

        // if(arrMaHangmiss.length>0){
        //     alert("Một số Mã Hàng chưa liệt kê công đoạn theo mã Hàng. Vui Lòng kiểm tra")
        //     GridviewMaHangMissLoad(oderNo,khachHang);
        // }else {
        //     GridviewOrderLoad(oderNo,khachHang)

        // }
      

    });

});

  
       