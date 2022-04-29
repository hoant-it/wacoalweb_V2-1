const db = require("../../databases/database").sequelize;
const xlsx = require("xlsx");
const del = require("del");

// var message='';
// var messageStatus=''
module.exports.OrderLoad = async (req, res) => {
  res.render("kho/Order", {
    title: "",
    userId: req.signedCookies.userId,
    html: "",
    // message: message,
    // messageStatus:messageStatus
  });
  // message='';
  // messageStatus=''
};

module.exports.OrderImportExcel = async (req, res) => {
  try {
    let lError = {};

    // console.log("post ne");
    const format = [
      "Classification",
      "MY",
      "Order",
      "UnitNo",
      "Style",
      "Cup",
      "Size",
      "Color",
      "OrderQty",
      "Note",
    ];
    //   console.log(req.body);
    var file = req.files.filename;
    //   console.log(file);
    var filename = file.name;
    //  console.log('filename '+filename);
    //di chuyen file vao thu muc public/excel để xử lý
    file.mv("./public/excel/" + filename, (err) => {
      if (err) {
        lError.errMes = ("Lỗi: ", err);
        lError.statusErr = false;
        return res.send(lError);
      } else {
        // doc file excel
        const workbook = xlsx.readFile("./public/excel/" + filename);
        const sheet_name_list = workbook.SheetNames;
        //do du lieu tu file excel vao mang jsonPagesArray
        let jsonPagesArray = [];
        sheet_name_list.forEach(function (sheet) {
          const jsonPage = {
            name: sheet,
            content: JSON.parse(
              JSON.stringify(
                xlsx.utils.sheet_to_json(workbook.Sheets[sheet], { defval: "" })
              )
            ),
          };
          jsonPagesArray.push(jsonPage);
        });
        //lay sheet dau tien
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        //kiem tra ten cot co dung hay chua
        var i = 0;
        for (let cell in worksheet) {
          const cellAsString = cell.toString();
          if (i === 1 && worksheet[cell].v !== format[0]) {
            lError.errMes = "File excel " + filename + " lỗi định dạng ";
            lError.statusErr = false;
            return res.send(lError);
          }
          if (i === 2 && worksheet[cell].v !== format[1]) {
            lError.errMes = "File excel " + filename + " lỗi định dạng";
            lError.statusErr = false;
            return res.send(lError);
          }
          if (i === 3 && worksheet[cell].v !== format[2]) {
            lError.errMes = "File excel " + filename + " lỗi định dạng";
            lError.statusErr = false;
            return res.send(lError);
          }
          if (i === 4 && worksheet[cell].v !== format[3]) {
            lError.errMes = "File excel " + filename + " lỗi định dạng";
            lError.statusErr = false;
            return res.send(lError);
          }
          if (i === 5 && worksheet[cell].v !== format[4]) {
            lError.errMes = "File excel " + filename + " lỗi định dạng";
            lError.statusErr = false;
            return res.send(lError);
          }
          if (i === 6 && worksheet[cell].v !== format[5]) {
            lError.errMes = "File excel " + filename + " lỗi định dạng";
            lError.statusErr = false;
            return res.send(lError);
          }
          if (i === 7 && worksheet[cell].v !== format[6]) {
            lError.errMes = "File excel " + filename + " lỗi định dạng";
            lError.statusErr = false;
            return res.send(lError);
          }
          if (i === 8 && worksheet[cell].v !== format[7]) {
            lError.errMes = "File excel " + filename + " lỗi định dạng";
            lError.statusErr = false;
            return res.send(lError);
          }
          if (i === 9 && worksheet[cell].v !== format[8]) {
            lError.errMes = "File excel " + filename + " lỗi định dạng";
            lError.statusErr = false;
            return res.send(lError);
          }
          if (i === 10 && worksheet[cell].v !== format[9]) {
            lError.errMes = "File excel " + filename + " lỗi định dạng";
            lError.statusErr = false;
            return res.send(lError);
          }
          i++;
        }

        for (var i = 0; i < jsonPagesArray[0].content.length; i++) {
          db.query(
            `DONHANGITEM_3_Insert_Web_V1 
            @Classification=:Classification,
            @MY=:MY,
            @OrderNo=:OrderNo,
            @UnitNo=:UnitNo,
            @Style=:Style,
            @Cup=:Cup,
            @Size=:Size,
            @Color=:Color,
            @OrderQty=:OrderQty, 
            @Note=:Note, 
            @UserName=:UserName
            `,
            {
              replacements: {
                Classification: jsonPagesArray[0].content[i].Classification,
                MY: jsonPagesArray[0].content[i].MY,
                OrderNo: jsonPagesArray[0].content[i].Order,
                UnitNo: jsonPagesArray[0].content[i].UnitNo,
                Style: jsonPagesArray[0].content[i].Style,
                Cup: jsonPagesArray[0].content[i].Cup,
                Size: jsonPagesArray[0].content[i].Size,
                Color: jsonPagesArray[0].content[i].Color,
                OrderQty: jsonPagesArray[0].content[i].OrderQty,
                // ===''?0:jsonPagesArray[0].content[i].OrderQty,
                Note: jsonPagesArray[0].content[i].Note,
                UserName: req.signedCookies.userId,
              },
            }
          ).catch((err) => {
            //   console.log(er.message)
            lError.errMes = "Lỗi :" + err;
            lError.statusErr = false;
            return res.send(lError);
          });
        }

        // console.log(super_array);
        del(["./public/excel/" + filename]);
        lError.errMes = "Nhập file excel" + filename + " thành công";
        lError.statusErr = true;
        return res.send(lError);
      }
    });
  } catch (error) {
    lError.errMes = ("Lỗi", error);
    lError.statusErr = false;
    return res.send(lError);
  }
};

//order load grid
module.exports.DONHANGITEM_3_Load_Web_V1 = async (req, res) => {
  const { MY } = req.params;
  // console.log(req.params);

  try {
    await db
      .query("DONHANGITEM_3_Load_Web_V1 @MY=:MY ", {
        replacements: { MY: MY },
      })
      .then((result) => {
        res.json({
          data: result[0],
        });
      })
      .catch((err) => {
        res.json({
          data: [],
          message: "err: " + err.message,
        });
      });
  } catch (error) {
    res.json({
      data: {},
      message: `Query Failed. Error: ${error}`,
    });
  }
};

module.exports.DONHANGITEM_3_MY_SearchBox_Web_V1 = async (req, res) => {
  try {
    await db
      .query("DONHANGITEM_3_MY_SearchBox_Web_V1 ", {
        replacements: {},
      })
      .then((result) => {
        res.json({
          data: result[0],
        });
      })
      .catch((err) => {
        res.json({
          data: [],
          message: "err: " + err.message,
        });
      });
  } catch (error) {
    res.json({
      data: {},
      message: `Query Failed. Error: ${error}`,
    });
  }
};

//order draft load grid
module.exports.DONHANGITEM_DRAFT_Load_Web_V1 = async (req, res) => {
  const { MY } = req.params;
  // console.log(req.params);

  try {
    await db
      .query("DONHANGITEM_DRAFT_Load_Web_V1 @MY=:MY ", {
        replacements: { MY: MY },
      })
      .then((result) => {
        res.json({
          data: result[0],
        });
      })
      .catch((err) => {
        res.json({
          data: [],
          message: "err: " + err.message,
        });
      });
  } catch (error) {
    res.json({
      data: {},
      message: `Query Failed. Error: ${error}`,
    });
  }
};

module.exports.OrderDraftImportExcel = async (req, res) => {
  let lError = {};
  try {
    var filename = req.file.filename;
    let filePath = "./public/excel/" + filename;

    // doc file excel
    const workbook = await xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    //lay header cua excel file
    const workbookHeaders = await xlsx.readFile(filePath, { sheetRows: 1 });
    //tao mang tu workbookHeaders
    const columnsArrayHeaders = await xlsx.utils.sheet_to_json(
      workbookHeaders.Sheets[workbook.SheetNames[0]],
      { header: 1 }
    )[0];
    const formatHeader = [
      "Classification",
      "OrderNo",
      "UnitNo",
      "Style",
      "Cup",
      "Size",
      "Color",
      "OrderQty",
      "Note",
      "MY",
      "TIMECREATE",
      "USERCREATE",
      "TIMEUPDATE",
      "USERUPDATE",
    ];
    if (columnsArrayHeaders.length != formatHeader.length) {
      lError.errMes = "Lỗi: Định dạng cột sai";
      lError.statusErr = false;
      return res.send(lError);
    }
    for (let i = 0; i < columnsArrayHeaders.length; i++) {
      let excelheaderName = columnsArrayHeaders[i];
      let formatheaderName = formatHeader[i];
      if (excelheaderName !== formatheaderName) {
        lError.errMes = `Lỗi: format Header không đúng ( ${excelheaderName} # ${formatheaderName} )`;
        lError.statusErr = false;
        return res.send(lError);
      }
    }

    //do du lieu tu file excel vao mang jsonPagesArray
    let jsonPagesArray = [];
    sheet_name_list.forEach(function (sheet) {
      const jsonPage = {
        name: sheet,
        content: JSON.parse(
          JSON.stringify(
            xlsx.utils.sheet_to_json(workbook.Sheets[sheet], { defval: "" })
          )
        ),
      };
      jsonPagesArray.push(jsonPage);
    });

    var arrContent=jsonPagesArray[0].content;
    var arrContentEmptyColor=arrContent.filter((item)=>{
        return item.Color=='' || item.Style==''//loc nhung hinh chu nhat co chieu dai lon hon 5
        })
        if(arrContentEmptyColor.length>0){
            lError.errMes = "Lỗi: Màu hoặc Mã Hàng Trống"
            lError.statusErr = false
            return res.send(lError)
        }


    for (let i = 0; i < jsonPagesArray[0].content.length; i++) {
      await db
        .query(
          `DONHANGITEM_DRAFT_Insert_Web_V1 
              @Classification=:Classification,
              @MY=:MY,
              @OrderNo=:OrderNo,
              @UnitNo=:UnitNo,
              @Style=:Style,
              @Cup=:Cup,
              @Size=:Size,
              @Color=:Color,
              @OrderQty=:OrderQty, 
              @Note=:Note, 
              @UserName=:UserName
              `,
          {
            replacements: {
              Classification: jsonPagesArray[0].content[i].Classification,
              MY: jsonPagesArray[0].content[i].MY,
              OrderNo: jsonPagesArray[0].content[i].OrderNo,
              UnitNo: jsonPagesArray[0].content[i].UnitNo,
              Style: jsonPagesArray[0].content[i].Style,
              Cup: jsonPagesArray[0].content[i].Cup,
              Size: jsonPagesArray[0].content[i].Size,
              Color: jsonPagesArray[0].content[i].Color,
              OrderQty: jsonPagesArray[0].content[i].OrderQty,
              // ===''?0:jsonPagesArray[0].content[i].OrderQty,
              Note: jsonPagesArray[0].content[i].Note,
              UserName: req.signedCookies.userId,
            },
          }
        )
        .catch((err) => {
          //   console.log(er.message)
          lError.errMes = "Lỗi :" + err;
          lError.statusErr = false;
          return res.send(lError);
        });
    }

    // console.log(super_array);
    del([filePath]);
    lError.errMes = "Nhập file excel" + filename + " thành công";
    lError.statusErr = true;
    return res.send(lError);
  } catch (error) {
    lError.errMes = "Lỗi " + error;
    lError.statusErr = false;
    return res.send(lError);
  }
};

module.exports.DONHANGITEM_DRAFT_MY_SearchBox_Web_V1 = async (req, res) => {
  try {
    await db
      .query("DONHANGITEM_DRAFT_MY_SearchBox_Web_V1 ", {
        replacements: {},
      })
      .then((result) => {
        res.json({
          data: result[0],
        });
      })
      .catch((err) => {
        res.json({
          data: [],
          message: "err: " + err.message,
        });
      });
  } catch (error) {
    res.json({
      data: {},
      message: `Query Failed. Error: ${error}`,
    });
  }
};
