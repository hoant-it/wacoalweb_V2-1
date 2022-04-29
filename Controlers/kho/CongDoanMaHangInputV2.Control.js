const db= require('../../databases/database').sequelize;
const xlsx= require('xlsx');
const del=require('del')

var message='';
var messageStatus=''
module.exports.CongDoanMaHangInputV2Get= async (req, res ) => {
    res.render('kho/CongDoanMaHangInputV2',{
        title:'Express',
        userId:req.signedCookies.userId,
        html:'',
        message: message,
        messageStatus:messageStatus
    })
    message='';
    messageStatus=''
}

module.exports.CongdoanMaHangPost = async (req, res ) => {
    try {
      // console.log("post ne");
        const format=["MAHANG","MAUMH","CONGDOAN","TENCONGDOAN","KYHIEUMAY","LOAIMAY","MAVITRICHI","LOAICHI","BIENDO","MATDO","MAUNL","MAMAUCHI","CHIEUDAI_CONGDOAN"]
        const posts=[];
       //   console.log(req.body);
         var file = req.files.filename;
       //   console.log(file);
         var filename=file.name;
        //  console.log('filename '+filename);
         file.mv('./public/excel/'+filename,(err) =>{
         if(err){
           message=('err',err);
           messageStatus='err';
           return res.redirect('/kho/congodanmahanginputv2');
         } else {
           const workbook=xlsx.readFile('./public/excel/'+filename);
           const sheet_name_list = workbook.SheetNames;
       
           let jsonPagesArray = [];
           sheet_name_list.forEach(function(sheet) {
               const jsonPage = {
                   name: sheet,
                   content: JSON.parse(JSON.stringify(xlsx.utils.sheet_to_json(workbook.Sheets[sheet],{defval:""})))
               };
               jsonPagesArray.push(jsonPage);
           });
             // console.log(jsonPagesArray[0].content);
             // res.send('ok');
       
             const worksheet= workbook.Sheets[workbook.SheetNames[0]];
           // let post={};
          var i=0;
           for(let cell in worksheet){
             const cellAsString = cell.toString();
            //  console.log(cellAsString + ' ' +i + ' ' + worksheet[cell].v);
            //  console.log(worksheet[cell].v +' ' +i);
             if(i===1 && worksheet[cell].v !== format[0] ){
                 message='excel File not in Format input';
                 messageStatus='err';
                 return res.redirect('/kho/congodanmahanginputv2');
             }
             if(i===2 && worksheet[cell].v !== format[1] ){
               message='excel File not in Format input';
               messageStatus='err';
               return res.redirect('/kho/congodanmahanginputv2');
           
             }
             if(i===3 && worksheet[cell].v !== format[2] ){
               message='excel File not in Format input';
               messageStatus='err';
               return res.redirect('/kho/congodanmahanginputv2');
             }
             if(i===4 && worksheet[cell].v !== format[3] ){
               message='excel File not in Format input';
               messageStatus='err';
               return res.redirect('/kho/congodanmahanginputv2');
             }
             if(i===5 && worksheet[cell].v !== format[4] ){
               message='excel File not in Format input';
               messageStatus='err';
               return res.redirect('/kho/congodanmahanginputv2');
             }
             if(i===6 && worksheet[cell].v !== format[5] ){
               message='excel File not in Format input';
               messageStatus='err';
               return res.redirect('/kho/congodanmahanginputv2');
             }
             if(i===7 && worksheet[cell].v !== format[6] ){
               message='excel File not in Format input';
               messageStatus='err';
               return res.redirect('/kho/congodanmahanginputv2');
             }
             if(i===8 && worksheet[cell].v !== format[7] ){
               message='excel File not in Format input';
               messageStatus='err';
               return res.redirect('/kho/congodanmahanginputv2');
             }
             if(i===9 && worksheet[cell].v !== format[8] ){
               message='excel File not in Format input';
               messageStatus='err';
               return res.redirect('/kho/congodanmahanginputv2');
             }
             if(i===10 && worksheet[cell].v !== format[9] ){
              message='excel File not in Format input';
              messageStatus='err';
              return res.redirect('/kho/congodanmahanginputv2');
            }
            if(i===11 && worksheet[cell].v !== format[10] ){
              message='excel File not in Format input';
              messageStatus='err';
              return res.redirect('/kho/congodanmahanginputv2');
            }
            if(i===12 && worksheet[cell].v !== format[11] ){
              message='excel File not in Format input';
              messageStatus='err';
              return res.redirect('/kho/congodanmahanginputv2');
            }
            if(i===13 && worksheet[cell].v !== format[12] ){
              message='excel File not in Format input';
              messageStatus='err';
              return res.redirect('/kho/congodanmahanginputv2');
            }
             i++
           }
          //  var flags = [], output = [], l = jsonPagesArray[0].content.length, i;
          //  for( i=0; i<l; i++) {
          //  if( flags[jsonPagesArray[0].content[i].MAHANG]) continue;
          //  flags[jsonPagesArray[0].content[i].MAHANG] = true;
          //  output.push(jsonPagesArray[0].content[i].MAHANG);
          //  }
           var MaHang, MauMH;
           MaHang=jsonPagesArray[0].content[0].MAHANG;
           MauMH=jsonPagesArray[0].content[0].MAUMH;
       
          //  console.log(MaHang)   
          //  console.log(MauMH) 
           
            db.query('CONGDOAN_MAHANG_Delete_Before_Import_Excel_Web_V2 @MAHANG=:MAHANG, @MAUMH=:MAUMH',{
              replacements:{MAHANG:MaHang, MAUMH:MauMH}
            }).then(result => {
       
            }).catch(err => {
              console.log(err);
            })
           
       
          //  console.log( `list input length `+jsonPagesArray[0].content.length)
           
         for (var i = 0 ; i <jsonPagesArray[0].content.length; i++){
            db.query(`wacoal_CONGDOAN_MAHANG_Insert_V3 
            @MAHANG=:MAHANG,
            @MAUMH=:MAUMH,
            @CONGDOAN=:CONGDOAN,
            @TENCONGDOAN=:TENCONGDOAN,
            @KYHIEUMAY=:KYHIEUMAY,
            @LOAIMAY=:LOAIMAY,
            @MAVITRICHI=:MAVITRICHI,
            @LOAICHI=:LOAICHI,
            @BIENDO=:BIENDO, 
            @MATDO=:MATDO, 
            @MAUNL=:MAUNL,
            @MAMAUCHI=:MAMAUCHI,
            @CHIEUDAI_CONGDOAN=:CHIEUDAI_CONGDOAN, 
            @UserName=:UserName
            `,{
             replacements: {
               MAHANG: jsonPagesArray[0].content[i].MAHANG,
               MAUMH: jsonPagesArray[0].content[i].MAUMH,
               CONGDOAN:jsonPagesArray[0].content[i].CONGDOAN,
               TENCONGDOAN:jsonPagesArray[0].content[i].TENCONGDOAN,
               KYHIEUMAY:jsonPagesArray[0].content[i].KYHIEUMAY,
               LOAIMAY:jsonPagesArray[0].content[i].LOAIMAY,
               MAVITRICHI:jsonPagesArray[0].content[i].MAVITRICHI,
               LOAICHI:jsonPagesArray[0].content[i].LOAICHI,
               BIENDO:jsonPagesArray[0].content[i].BIENDO===''?0:jsonPagesArray[0].content[i].BIENDO,
               MATDO:jsonPagesArray[0].content[i].MATDO===''?0:jsonPagesArray[0].content[i].MATDO,
               MAUNL:jsonPagesArray[0].content[i].MAUNL,
               MAMAUCHI:jsonPagesArray[0].content[i].MAMAUCHI,
               CHIEUDAI_CONGDOAN:jsonPagesArray[0].content[i].CHIEUDAI_CONGDOAN===''?0:jsonPagesArray[0].content[i].CHIEUDAI_CONGDOAN,
               UserName:req.signedCookies.userId,
            }
           }).catch(err => {
           //   console.log(er.message)
             message=('err',err);
             messageStatus='err';
             return res.redirect('/kho/congodanmahanginputv2');
           }); 
         }
         // console.log(super_array);
         del(['./public/excel/'+filename]);
           message='Import excel file successfull';
           messageStatus='ok';
           return res.redirect('/kho/congodanmahanginputv2');
       }});
       
       } catch (error) {
         // console.log(error.message);
         message = ('err',error);
         messageStatus='err';
         return res.redirect('/kho/congodanmahanginputv2');
       }
       
}

module.exports.CongdoanMaHangajax= async (req, res ,next) => {
  let lError={};
  try {
    // console.log("post ne");
    const format=["MAHANG","MAUMH","CONGDOAN","TENCONGDOAN","KYHIEUMAY","LOAIMAY","MAVITRICHI","LOAICHI","BIENDO","MATDO","MAUNL","MAMAUCHI","CHIEUDAI_CONGDOAN"]
       var filename=req.file.filename;
         // doc file excel
         const workbook=xlsx.readFile('./public/excel/'+filename);
         const sheet_name_list = workbook.SheetNames;
         //do du lieu tu file excel vao mang jsonPagesArray
         let jsonPagesArray = [];
         sheet_name_list.forEach(function(sheet) {
             const jsonPage = {
                 name: sheet,
                 content: JSON.parse(JSON.stringify(xlsx.utils.sheet_to_json(workbook.Sheets[sheet],{defval:""})))
             };
             jsonPagesArray.push(jsonPage);
         });
         //lay sheet dau tien 
           const worksheet= workbook.Sheets[workbook.SheetNames[0]];
         //kiem tra ten cot co dung hay chua
        var i=0;
         for(let cell in worksheet){
          //  const cellAsString = cell.toString();
           if(i===1 && worksheet[cell].v !== format[0] ){
            lError.errMes='File excel '+ filename+ ' lỗi định dạng ';
            lError.statusErr=false;
            return res.send(lError)
           }
           if(i===2 && worksheet[cell].v !== format[1] ){
            lError.errMes='File excel '+filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError)
           }
           if(i===3 && worksheet[cell].v !== format[2] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===4 && worksheet[cell].v !== format[3] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===5 && worksheet[cell].v !== format[4] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===6 && worksheet[cell].v !== format[5] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===7 && worksheet[cell].v !== format[6] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===8 && worksheet[cell].v !== format[7] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===9 && worksheet[cell].v !== format[8] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===10 && worksheet[cell].v !== format[9] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===11 && worksheet[cell].v !== format[10] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===12 && worksheet[cell].v !== format[11] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===13 && worksheet[cell].v !== format[12] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           i++
         }
         //them du lieu tu sheet excel vao database

       var MaHang, MauMH;
           MaHang=jsonPagesArray[0].content[0].MAHANG;
           MauMH=jsonPagesArray[0].content[0].MAUMH;
       
          //  console.log(MaHang)   
          //  console.log(MauMH) 
           
        await    db.query('CONGDOAN_MAHANG_Delete_Before_Import_Excel_Web_V2 @MAHANG=:MAHANG, @MAUMH=:MAUMH',{
              replacements:{MAHANG:MaHang, MAUMH:MauMH}
            })
         for (var i = 0 ; i <jsonPagesArray[0].content.length; i++){
         await   db.query(`wacoal_CONGDOAN_MAHANG_Insert_V3 
            @MAHANG=:MAHANG,
            @MAUMH=:MAUMH,
            @CONGDOAN=:CONGDOAN,
            @TENCONGDOAN=:TENCONGDOAN,
            @KYHIEUMAY=:KYHIEUMAY,
            @LOAIMAY=:LOAIMAY,
            @MAVITRICHI=:MAVITRICHI,
            @LOAICHI=:LOAICHI,
            @BIENDO=:BIENDO, 
            @MATDO=:MATDO, 
            @MAUNL=:MAUNL,
            @MAMAUCHI=:MAMAUCHI,
            @CHIEUDAI_CONGDOAN=:CHIEUDAI_CONGDOAN, 
            @UserName=:UserName
            `,{
             replacements: {
               MAHANG: jsonPagesArray[0].content[i].MAHANG,
               MAUMH: jsonPagesArray[0].content[i].MAUMH,
               CONGDOAN:jsonPagesArray[0].content[i].CONGDOAN,
               TENCONGDOAN:jsonPagesArray[0].content[i].TENCONGDOAN,
               KYHIEUMAY:jsonPagesArray[0].content[i].KYHIEUMAY,
               LOAIMAY:jsonPagesArray[0].content[i].LOAIMAY,
               MAVITRICHI:jsonPagesArray[0].content[i].MAVITRICHI,
               LOAICHI:jsonPagesArray[0].content[i].LOAICHI,
               BIENDO:jsonPagesArray[0].content[i].BIENDO===''?0:jsonPagesArray[0].content[i].BIENDO,
               MATDO:jsonPagesArray[0].content[i].MATDO===''?0:jsonPagesArray[0].content[i].MATDO,
               MAUNL:jsonPagesArray[0].content[i].MAUNL,
               MAMAUCHI:jsonPagesArray[0].content[i].MAMAUCHI,
               CHIEUDAI_CONGDOAN:jsonPagesArray[0].content[i].CHIEUDAI_CONGDOAN===''?0:jsonPagesArray[0].content[i].CHIEUDAI_CONGDOAN,
               UserName:req.signedCookies.userId,
            }
           }).catch(err => {
           //   console.log(er.message)
           lError.errMes='Lỗi :' +err;
           lError.statusErr=false;
           return res.send(lError);
           }); 
         }

       // console.log(super_array);
       del(['./public/excel/'+filename]);
       lError.errMes='Nhập file excel'+filename+' thành công';
       lError.statusErr=true;
       return res.send(lError);
     
     
     } catch (error) {
      lError.errMes=('Lỗi',error);;
      lError.statusErr=false;
      return res.send(lError);
     }
     
}

module.exports.CONGDOAN_MAHANG_New_Web_Load_V1 = async (req, res) =>{
try {
  await db.query('CONGDOAN_MAHANG_New_Web_Load_V1',{
    replacements:{}
  }).then( result =>{
    res.json({
      data:result[0]
    })
  }).catch(err =>{
    res.json({
      data:{},
      message:`err : ${err.message}`
    })
  })
  
} catch (error) {
  next(error);
  // res.json({
  //   data:{},
  //   message:`err : ${error}`
  // })
  
}
}

module.exports.CongdoanMaHangajax1= async (req, res ,next) => {
  try {
    let lError={};
 
    // console.log("post ne");
    const format=["MAHANG","MAUMH","CONGDOAN","TENCONGDOAN","KYHIEUMAY","LOAIMAY","MAVITRICHI","LOAICHI","BIENDO","MATDO","MAUNL","MAMAUCHI","CHIEUDAI_CONGDOAN"]
     //   console.log(req.body);
       var file = req.files.filename;
     //   console.log(file);
       var filename=file.name;
      //  console.log('filename '+filename);
      //di chuyen file vao thu muc public/excel để xử lý
       file.mv('./public/excel/'+filename,(err) =>{
       if(err){
        lError.errMes=('Lỗi: ',err);
        lError.statusErr=false;
        return res.send(lError);
       } else {
         // doc file excel
         const workbook=xlsx.readFile('./public/excel/'+filename);
         const sheet_name_list = workbook.SheetNames;
         //do du lieu tu file excel vao mang jsonPagesArray
         let jsonPagesArray = [];
         sheet_name_list.forEach(function(sheet) {
             const jsonPage = {
                 name: sheet,
                 content: JSON.parse(JSON.stringify(xlsx.utils.sheet_to_json(workbook.Sheets[sheet],{defval:""})))
             };
             jsonPagesArray.push(jsonPage);
         });
         //lay sheet dau tien 
           const worksheet= workbook.Sheets[workbook.SheetNames[0]];
         //kiem tra ten cot co dung hay chua
        var i=0;
         for(let cell in worksheet){
           const cellAsString = cell.toString();
           if(i===1 && worksheet[cell].v !== format[0] ){
            lError.errMes='File excel '+ filename+ ' lỗi định dạng ';
            lError.statusErr=false;
            return res.send(lError)
           }
           if(i===2 && worksheet[cell].v !== format[1] ){
            lError.errMes='File excel '+filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError)
           }
           if(i===3 && worksheet[cell].v !== format[2] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===4 && worksheet[cell].v !== format[3] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===5 && worksheet[cell].v !== format[4] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===6 && worksheet[cell].v !== format[5] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===7 && worksheet[cell].v !== format[6] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===8 && worksheet[cell].v !== format[7] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===9 && worksheet[cell].v !== format[8] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===10 && worksheet[cell].v !== format[9] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===11 && worksheet[cell].v !== format[10] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===12 && worksheet[cell].v !== format[11] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           if(i===13 && worksheet[cell].v !== format[12] ){
            lError.errMes='File excel '+ filename +' lỗi định dạng';
            lError.statusErr=false;
            return res.send(lError);
           }
           i++
         }
         //them du lieu tu sheet excel vao database

       var MaHang, MauMH;
           MaHang=jsonPagesArray[0].content[0].MAHANG;
           MauMH=jsonPagesArray[0].content[0].MAUMH;
       
          //  console.log(MaHang)   
          //  console.log(MauMH) 
           
            db.query('CONGDOAN_MAHANG_Delete_Before_Import_Excel_Web_V2 @MAHANG=:MAHANG, @MAUMH=:MAUMH',{
              replacements:{MAHANG:MaHang, MAUMH:MauMH}
            }).then(result => {
       
            }).catch(err => {
              console.log(err);
            })
           
       
          //  console.log( `list input length `+jsonPagesArray[0].content.length)
           
         for (var i = 0 ; i <jsonPagesArray[0].content.length; i++){
            db.query(`wacoal_CONGDOAN_MAHANG_Insert_V3 
            @MAHANG=:MAHANG,
            @MAUMH=:MAUMH,
            @CONGDOAN=:CONGDOAN,
            @TENCONGDOAN=:TENCONGDOAN,
            @KYHIEUMAY=:KYHIEUMAY,
            @LOAIMAY=:LOAIMAY,
            @MAVITRICHI=:MAVITRICHI,
            @LOAICHI=:LOAICHI,
            @BIENDO=:BIENDO, 
            @MATDO=:MATDO, 
            @MAUNL=:MAUNL,
            @MAMAUCHI=:MAMAUCHI,
            @CHIEUDAI_CONGDOAN=:CHIEUDAI_CONGDOAN, 
            @UserName=:UserName
            `,{
             replacements: {
               MAHANG: jsonPagesArray[0].content[i].MAHANG,
               MAUMH: jsonPagesArray[0].content[i].MAUMH,
               CONGDOAN:jsonPagesArray[0].content[i].CONGDOAN,
               TENCONGDOAN:jsonPagesArray[0].content[i].TENCONGDOAN,
               KYHIEUMAY:jsonPagesArray[0].content[i].KYHIEUMAY,
               LOAIMAY:jsonPagesArray[0].content[i].LOAIMAY,
               MAVITRICHI:jsonPagesArray[0].content[i].MAVITRICHI,
               LOAICHI:jsonPagesArray[0].content[i].LOAICHI,
               BIENDO:jsonPagesArray[0].content[i].BIENDO===''?0:jsonPagesArray[0].content[i].BIENDO,
               MATDO:jsonPagesArray[0].content[i].MATDO===''?0:jsonPagesArray[0].content[i].MATDO,
               MAUNL:jsonPagesArray[0].content[i].MAUNL,
               MAMAUCHI:jsonPagesArray[0].content[i].MAMAUCHI,
               CHIEUDAI_CONGDOAN:jsonPagesArray[0].content[i].CHIEUDAI_CONGDOAN===''?0:jsonPagesArray[0].content[i].CHIEUDAI_CONGDOAN,
               UserName:req.signedCookies.userId,
            }
           }).catch(err => {
           //   console.log(er.message)
           lError.errMes='Lỗi :' +err;
           lError.statusErr=false;
           return res.send(lError);
           }); 
         }

       // console.log(super_array);
       del(['./public/excel/'+filename]);
       lError.errMes='Nhập file excel'+filename+' thành công';
       lError.statusErr=true;
       return res.send(lError);
     }});
     
     } catch (error) {
      lError.errMes=('Lỗi',error);;
      lError.statusErr=false;
      return res.send(lError);
     }
     
}




