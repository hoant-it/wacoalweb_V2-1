var MaHang='';

const searchBoxMaHang=() =>{
    const selectBoxData =  DevExpress.data.AspNet.createStore({
        key: "MAHANG",
        loadMode:"raw",
        loadUrl:"/api/wacoal_MaHang_Select_V1",
    });

    var searchBox = $("#searchBoxMH").dxSelectBox({
        dataSource:selectBoxData,
        // DevExpress.data.AspNet.createStore({
        //     key: "MAKH",
        //     loadUrl: serviceUrl + "/Khowacoal_KHACHHANG_load_Web_V1",
        //     // insertUrl: serviceUrl + "/InsertAction"
        // }),
        displayExpr: "MAHANG",
        valueExpr: "MAHANG",
        searchEnabled: true,
        searchExpr:'MAHANG',
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





const GridviewMaHangLoad = (MaHang) => {
    var url = "/api/wacoal_TinhChi_MaHang_V1/";
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        key: "keyMAHANG",
        loadUrl: url  + MaHang ,
       
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
        height: 555,
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
            var worksheet = workbook.addWorksheet('FORMAT ĐẶT CHỈ');
            
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
                  var maHangName='';
                  if(MaHang==="*"){
                    maHangName="All";
                  }else{
                    maHangName=MaHang;

                  }
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'TinhChi_MH_'+maHangName+'.xlsx');
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
                caption: "R60",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"left",
                    dataField: "COLOR_R60",
                    format: "string"
                }, {
                    caption: "QTY",
                    alignment:"right",
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
                caption: "GOMU",
                alignment:"center",
                columns: [{
                    caption: "COLOR",
                    alignment:"center",
                    dataField: "COLOR_GOMU",
                    // format: "fixedPoint"
                }, {
                    caption: "QTY",
                    alignment:"center",
                    dataField: "SL_GOMU",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                }]
            } ,
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
        onToolbarPreparing: function(e){
            e.toolbarOptions.items.unshift({
                location:"alter",
                template:function(){
                    return $('<div/>')
                    .addClass("informer")
                        .append(
                         `
                         <form action="/kho/congodanmahanginputv2" method="POST" enctype="multipart/form-data" id="frmUpload">
                         <input type="file" name="filename" id="filename" />
                         </from>
                         `
                        );
                }

            },
            {
                location:"alter",
                widget:"dxButton",
                options:{
                    icon:"upload",
                    text:"",
                    onInitialized: function (e) {
                        e.element.attr("id", "btnUpload");
                    },
                    onClick: function (){
                        // console.log("clicker")
                       upload();
                    }
                }
            },
            {
                location: "alter",
                widget: "dxSelectBox",
           
                options: {
                    dataSource:DevExpress.data.AspNet.createStore({
                        key: "MAHANG",
                        loadMode:"raw",
                        loadUrl:"/api/wacoal_MaHang_Select_V1",
                    }),
                    placeholder: "Chọn Mã Hàng *",

                    width: 200,
                    displayExpr: "MAHANG",
                    valueExpr: "MAHANG",
                    searchEnabled: true,
                    searchExpr:'MAHANG',
                    searchMode:'contains',
                    searchTimeout:200,
                    minSearchLength:0,
                    showDataBeforeSearch:false,
                    value:MaHang,
                    onInitialized: function (e) {
                        e.element.attr("id", "selectBoxMH");
                    },
                    onValueChanged: function(e) {
                        MaHang=e.value;
                        GridviewMaHangLoad(MaHang);
                        // console.log("valuae "+e.value);
                        // dataGrid.clearGrouping();
                        // dataGrid.columnOption(e.value, "groupIndex", 0);
                        // $(".informer .count").text(getGroupCount(e.value));
                    }
                }
            },
            // {
            //     location:"alter",
            //     widget:"dxButton",
            //     options:{
            //         icon:"arrowdown",
            //         text:"",
            //         onClick: function (){
            //             // console.log("clicker")
            //             MaHang=$("#selectBoxMH").dxSelectBox('instance').option('value');
            //             GridviewMaHangLoad(MaHang);
            //         }
            //     }
            // },
            


            )
        },
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
                {column: "SL_GOMU",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }},
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

const GridviewMauNLLoaiChiNewLoad = () => {
    var url = "/api/wacoal_MauNL_LoaiChi_Moi_Load_Web_V1/";
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        key: "keyMauNL_LoaiChi",
        loadUrl: url   ,
       
        // insertUrl: url + "/InsertOrder",
        // updateUrl: url + "/UpdateOrder",
        // deleteUrl: url + "/DeleteOrder",
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridMauNL_LoaiChi").dxDataGrid({
        dataSource: listTinhChi,
        // reshapeOnPush: true,
        columnsAutoWidth: true,
        height: 555,
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
            var worksheet = workbook.addWorksheet('MauNL_LoaiChi_New');
            
            DevExpress.excelExporter.exportDataGrid({
              component: e.component,
              worksheet: worksheet,
            //   topLeftCell: { row: 6, column: 1 },
            //   customizeCell: function(options) {
            //     var gridCell = options.gridCell;
            //     var excelCell = options.excelCell;
                
            //     if(gridCell.rowType === "data") {
            //         if(gridCell.column.dataField.includes("COLOR")) {
            //             // excelCell.value = parseInt(gridCell.value);
            //             // excelCell.numFmt = excelCell.value===0?'-':excelCell.value;
            //             excelCell.alignment = { horizontal: 'left' };
            //           }
            //           if(gridCell.column.dataField.includes("SL")) {
            //             // excelCell.value = parseFloat(gridCell.value);
            //             if(gridCell.value===0){
            //                 excelCell.numFmt = "-";
            //             }
            //             // excelCell.numFmt = "0;-0;-;@";
            //             excelCell.alignment = { horizontal: 'right' };
            //           }
            //     }
            //     if(gridCell.rowType === "group") {
            //       excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "BEDFE6" } };
            //     }
            //     if(gridCell.rowType === "totalFooter" ) {
            //     //   excelCell.font.italic = true;
            //       excelCell.alignment= { horizontal: 'right' };
            //     }
            //   }
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
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'MauNL_LoaiChi_New.xlsx');
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
                caption: "MAUNL",
                alignment:"center",
                dataField: "MAUNL",
            },
            {
                caption: "LOAICHI",
                alignment:"center",
                dataField: "LOAICHI",
            },
            {
                caption: "MAUCHI",
                alignment:"center",
                dataField: "MAUCHI",
            },
               
        ],
        
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

const GridMHCDNewLoad = () => {
    var url = "CONGDOAN_MAHANG_New_Web_Load_V1";
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        // type: 'odata',
        key: "KeyMHM",
        loadUrl: url   ,
       
        // insertUrl: url + "/InsertOrder",
        // updateUrl: url + "/UpdateOrder",
        // deleteUrl: url + "/DeleteOrder",
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridMHCDNew").dxDataGrid({
        dataSource: listTinhChi,
                 // phan trang
                 paging: {
                    pageSize: 5
                },
                pager: {
                    showPageSizeSelector: true,
                    allowedPageSizes: [10, 25, 50, 100],
                  },
        // reshapeOnPush: true,
        columnsAutoWidth: true,
        height: 555,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        columnAutoWidth: true,
        export:{
            enabled: true
        },
        focusedRowEnabled: true,
        // searchPanel: {
        //     visible: true,
        //     highlightCaseSensitive: true,
        //     // width: 240,
        //     // placeholder: "Search..."
        // },
 
       
        onExporting: function(e) {

            console.log("exportting");
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('MH_CD_New');
            
            DevExpress.excelExporter.exportDataGrid({
              component: e.component,
              worksheet: worksheet,
            })
            .then(function() {
              workbook.xlsx.writeBuffer().then(function(buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'MH_CD_New.xlsx');
              });
            });
            e.cancel = true;
          },
        // rowDragging:{
        //     data: 1,
        //     group: "tasksGroup",
        //     onAdd: onAdd
        // },
        // filterRow: {
        //     visible: true,
        //     applyFilter: "auto"
        // },
        remoteOperations: true,   
     
        // headerFilter: {
        //     visible: false
        // },
        // groupPanel: {
        //     visible: false
        // },
        // scrolling: {
        //     rowRenderingMode:"virtual"
        //     // mode: "virtual"
        // },
      
        
        columns: [
            {
                caption: "MAHANG",
                alignment:"center",
                dataField: "Style",
            },
            {
                caption: "MAUMH",
                alignment:"center",
                dataField: "Color",
            },
        ],
    }).dxDataGrid("instance");

}



const upload=()=>{
    // let formData=new FormData($("frmUpload"));
    let formData  =new FormData(document.getElementById("frmUpload"));
    // for(let i=0; i<this.files.length;i++){
    //     formData.append('file',this.files[i]);
    // }
  let fileName=  $('#filename').val();
  let fileType= fileName.split('.').pop();


  if(fileType != "xlsx" && fileType != "xls"){
    DevExpress.ui.notify({
        message: "Chỉ nhận excel file",
        width: 450
    },"warning",5000)
    $('#filename').val("")
    return;
  }

    //   let data ={
    //     fileName:fileName
    //   }
  if(fileName==="" ){
    DevExpress.ui.notify({
        message: "Chọn file trước khi nhập",
        width: 450
    },"warning",5000)
  } else{
      console.log(fileName);
      $.ajax({
          type:"POST",
        //   data:JSON.stringify(data),
        data:formData,
        //   contentType:"application/json" ,
          contentType:false ,
          url:"/kho/congodanmahanginputv2",
          cache: false, 
          processData:false,
          success:(res)=>{

              if(res.statusErr){
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"success",5000)
                GridviewMauNLLoaiChiNewLoad();
                GridMHCDNewLoad();

              } else{
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"error",5000)

              }

          }
      })

  }


}

const loadTooltip=(id,targetButton)=>{
    $(`#${id}`).dxTooltip({
        target: `#${targetButton}`,
        showEvent: "mouseenter",
        hideEvent: "mouseleave",
        closeOnOutsideClick: false
    }); 
}

$(function(){
    MaHang='None';
    GridviewMauNLLoaiChiNewLoad();
    searchBoxMaHang();
    GridviewMaHangLoad(MaHang);
    GridMHCDNewLoad();
    loadTooltip("tooltipUpload","btnUpload");
    
    $('#btnSearchId').click((e) => {
        // console.log('click ne');
        e.preventDefault();
        MaHang=$("#searchBoxMH").dxSelectBox('instance').option('value');
        // $('#selectKH').val();
        GridviewMaHangLoad(MaHang);
      

    });
});

