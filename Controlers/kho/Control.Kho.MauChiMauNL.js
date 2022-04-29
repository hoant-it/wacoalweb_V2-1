
const db= require('../../databases/database').sequelize;
const xlsx= require('xlsx');
const del=require('del');


module.exports.MauchiMauNLLoad = async (req,res) =>{
    res.render('kho/MauChi_MauNl',{
        title:'MCMNL_wacoal',
        userId:req.signedCookies.userId,
        html:'',
    })
  }

  module.exports.MauChiMauNLUpdate= async (req, res ) =>{
      let lError={}
      const {mauNL,loaiChi,mauChi,status}= req.body;
      console.log(req.body);
     if(status==='submitInsert'){
         try {
            await db.query(`wacoal_MAUCHIMAUNL_Insert_Web_V1 
            @MAUNL=:MAUNL, 
            @LOAICHI=:LOAICHI, 
            @MAUCHI=:MAUCHI,
            @UserName=:UserName`,{
                replacements:{
                    MAUNL:mauNL,
                    LOAICHI:loaiChi,
                    MAUCHI:mauChi,
                    UserName:req.signedCookies.userId
                }
            }).then(result => {
                console.log(result);
                lError.errMes='sucessfull';
                lError.statusErr=true;
            })
         } catch (error) {
            lError.errMes=('Error: ',error.parent.message);
            lError.statusErr=false;
         }
     }
     if(status==="submitEdit"){
         try {
            await db.query(`wacoal_MAUCHIMAUNL_Update_Web_V1 
            @MAUNL=:MAUNL, 
            @LOAICHI=:LOAICHI, 
            @MAUCHI=:MAUCHI,
            @UserName=:UserName`,{
                replacements:{
                    MAUNL:mauNL,
                    LOAICHI:loaiChi,
                    MAUCHI:mauChi,
                    UserName:req.signedCookies.userId
                }
            }).then(result => {
                console.log(result);
                lError.errMes='sucessfull';
                lError.statusErr=true;
            })
         } catch (error) {
            lError.errMes=('Error: ',error.parent.message);
            lError.statusErr=false;
         }
     }
     console.log(lError);
     res.send(lError);
  }

  module.exports.MauChiMauNLDelete= async (req, res ) => {
    let lError={};
    console.log(req.body);
      const{mauNl,LoaiChi}=req.body;
      try {
        await db.query(`MAUCHIMAUNL_Delete_Web_V1 
        @MAUNL=:MAUNL,
        @LOAICHI=:LOAICHI`,{
            replacements:{MAUNL:mauNl,LOAICHI:LoaiChi}
        }).then(result => {
            console.log(result);
            lError.errMes='successfull';
            lError.statusErr=true;
        }).catch(err =>{
            lError.errMes=('Error: ',err.parent.message);
            lError.statusErr=false;
        });
      } catch (error) {
        lError.errMes=('Error: ',error.parent.message);
        lError.statusErr=false;
      }
      res.send(lError);
  }




  module.exports.MauChiMauNLInputajax = async (req, res) => {
    let lError = { errMes: "thành công", statusErr: true };
    try {
        var filename=req.file.filename;
    let filePath='./public/excel/'+filename+'';
    const workbook = await xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const workbookHeaders = await xlsx.readFile(filePath, { sheetRows: 1 });
    const columnsArrayHeaders = await xlsx.utils.sheet_to_json(
        workbookHeaders.Sheets[workbook.SheetNames[0]],
        { header: 1 }
      )[0];
      const formatHeader = ["MAUNL", "LOAICHI", "MAUCHI"]
      if (columnsArrayHeaders.length !== formatHeader.length) {
        lError.errMes = `Lỗi: format cột không đúng`;
        lError.statusErr = false;
      }
      for (let i = 0; i < columnsArrayHeaders.length; i++) {
        let excelheaderName = columnsArrayHeaders[i];
        let formatheaderName = formatHeader[i];
        if (excelheaderName !== formatheaderName) {
          lError.errMes = `Lỗi: format Tên Cột không đúng ( ${excelheaderName} # ${formatheaderName} )`;
          lError.statusErr = false;
          return lError;
        }
      }
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

      for (var i = 0; i < jsonPagesArray[0].content.length; i++) {
        arrJS=jsonPagesArray[0].content[i];
        if(arrJS.MAUCHI=='')continue;
         await  db.query(`wacoal_MAUCHIMAUNL_Import_excel_Web_V1 
          @MAUNL=:MAUNL,
          @LOAICHI=:LOAICHI,
          @MAUCHI=:MAUCHI,
          @UserName=:UserName
         `, {
          replacements: {
          MAUNL: arrJS.MAUNL,
          LOAICHI: arrJS.LOAICHI,
          MAUCHI: arrJS.MAUCHI,
          UserName:req.signedCookies.userId ,
          }
          } )
        }
        del(['./public/excel/' + filename]);
        return res.send(lError); 
    } catch (error) {
        lError.errMes = ('Lỗi ', error.parent.message);;
        lError.statusErr = false;
        return res.send(lError);
    }
}

module.exports.MauChiMauNLInputajax1 = (req, res) => {
    let lError = {};
    // console.log("post ne");
    const format = ["MAUNL", "LOAICHI", "MAUCHI"]
        //   console.log(req.body);
    var file = req.files.filename;
      console.log(req.files);
  
    var filename = file.name;
    
    let jsonPagesArray = [];
    let path='./public/excel/';
    
    //  console.log('filename '+filename);
    //di chuyen file vao thu muc public/excel để xử lý
    try {

        file.mv( path+ filename, (err) => {
            if (err) {
                lError.errMes = ('Lỗi: ', err);
                lError.statusErr = false;
                return res.send(lError);
            }
            lError.errMes = 'Nhập file excel' + filename + ' thành công';
                lError.statusErr = true;
                // doc file excel
                const workbook = xlsx.readFile(path + filename);
                const sheet_name_list = workbook.SheetNames;
                //do du lieu tu file excel vao mang jsonPagesArray
          
                //lay sheet dau tien 
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                //kiem tra ten cot co dung hay chua
                var i = 0;
                let errMes='File excel ' + filename + 'lỗi định dạng';
                for (let cell in worksheet) {
                    const cellAsString = cell.toString();
                    if (i === 1 && worksheet[cell].v !== format[0]) {
                        lError.errMes = errMes
                        lError.statusErr = false;
                        return res.send(lError)
                    }
                    if (i === 2 && worksheet[cell].v !== format[1]) {
                        lError.errMes = errMes
                        lError.statusErr = false;
                        return res.send(lError)
                    }
                    if (i === 3 && worksheet[cell].v !== format[2]) {
                        lError.errMes = errMes
                        lError.statusErr = false;
                        return res.send(lError);
                    }
                    i++
                }

                sheet_name_list.forEach(function(sheet) {
                    const jsonPage = {
                        name: sheet,
                        content: JSON.parse(JSON.stringify(xlsx.utils.sheet_to_json(workbook.Sheets[sheet], {
                            defval: ""
                        })))
                    };
                    jsonPagesArray.push(jsonPage);
                });
                //them du lieu tu sheet excel vao database
                for (var i = 0; i < jsonPagesArray[0].content.length; i++) {
                  arrJS=jsonPagesArray[0].content[i];
                     db.query(`wacoal_MAUCHIMAUNL_Import_excel_Web_V1 
                    @MAUNL=:MAUNL,
                    @LOAICHI=:LOAICHI,
                    @MAUCHI=:MAUCHI,
                    @UserName=:UserName
                   `, {
                    replacements: {
                    MAUNL: arrJS.MAUNL,
                    LOAICHI: arrJS.LOAICHI,
                    MAUCHI: arrJS.MAUCHI,
                    UserName:req.signedCookies.userId ,
                    }
                    } )
                  } 

                
                del(['./public/excel/' + filename]);
              
                return res.send(lError);
                // console.log(super_array); 
        })
    } catch (error) {
        lError.errMes = ('Lỗi ', error.parent.message);;
        lError.statusErr = false;
        return res.send(lError);
    } 


}













  


