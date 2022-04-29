const db= require('../../databases/database').sequelize;
const xlsx= require('xlsx');
const del=require('del')

var message='';
var messageStatus=''
module.exports.CDMHChiKhacMauGet= async ( req, res ) =>{
    res.render('kho/Kho_CDMH_ChiKhacMau_Input',{
        title:'Express',
        userId:req.signedCookies.userId,
        html:'',
        message: message,
        messageStatus:messageStatus
    })
    message='';
    messageStatus=''
    
}

module.exports.CDMHChiKhacMauPost= async ( req, res ) =>{try {
    const format=["MAHANG","MAUMH","CONGDOAN","CONGDOAN_NAME_VN","LOAIMAY","VITRICHI","LOAICHI","MAUNL","MAUCHI","BIENDO","MATDO","CHIEUDAI_CONGDOAN"]
     const posts=[];
   //   console.log(req.body);
     var file = req.files.filename;
   //   console.log(file);
     var filename=file.name;
   //   console.log(filename);
     file.mv('./public/excel/'+filename,(err) =>{
     if(err){
       message=('err',err);
       messageStatus='err';
       return res.redirect('/kho/Kho_CDMH_ChiKhacMau_Input');
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
         // const cellAsString = cell.toString();
         // console.log(cellAsString + ' ' +i + ' ' + worksheet[cell].v);
         // console.log(worksheet[cell].v +' ' +i);
         if(i===1 && worksheet[cell].v !== format[0] ){
             message='excel File not in Format input';
             messageStatus='err';
            return res.redirect('/kho/CDMHchikhacmauinput');
         }
         if(i===2 && worksheet[cell].v !== format[1] ){
           message='excel File not in Format input';
           messageStatus='err';
          return res.redirect('/kho/CDMHchikhacmauinput');
       
         }
         if(i===3 && worksheet[cell].v !== format[2] ){
           message='excel File not in Format input';
           messageStatus='err';
          return res.redirect('/kho/CDMHchikhacmauinput');
         }
         if(i===4 && worksheet[cell].v !== format[3] ){
           message='excel File not in Format input';
           messageStatus='err';
          return res.redirect('/kho/CDMHchikhacmauinput');
         }
         if(i===5 && worksheet[cell].v !== format[4] ){
           message='excel File not in Format input';
           messageStatus='err';
          return res.redirect('/kho/CDMHchikhacmauinput');
         }
         if(i===6 && worksheet[cell].v !== format[5] ){
           message='excel File not in Format input';
           messageStatus='err';
          return res.redirect('/kho/CDMHchikhacmauinput');
         }
         if(i===7 && worksheet[cell].v !== format[6] ){
           message='excel File not in Format input';
           messageStatus='err';
          return res.redirect('/kho/CDMHchikhacmauinput');
         }
         if(i===8 && worksheet[cell].v !== format[7] ){
           message='excel File not in Format input';
           messageStatus='err';
          return res.redirect('/kho/CDMHchikhacmauinput');
         }
         if(i===9 && worksheet[cell].v !== format[8] ){
           message='excel File not in Format input';
           messageStatus='err';
          return res.redirect('/kho/CDMHchikhacmauinput');
         }
         if(i===10 && worksheet[cell].v !== format[9] ){
           message='excel File not in Format input';
           messageStatus='err';
          return res.redirect('/kho/CDMHchikhacmauinput');
         }
         if(i===11 && worksheet[cell].v !== format[10] ){
           message='excel File not in Format input';
           messageStatus='err';
          return res.redirect('/kho/CDMHchikhacmauinput');
         }
         if(i===12 && worksheet[cell].v !== format[11] ){
           message='excel File not in Format input';
           messageStatus='err';
          return res.redirect('/kho/CDMHchikhacmauinput');
         }
         i++;
       }
       var flags = [], output = [], l = jsonPagesArray[0].content.length, i;
       for( i=0; i<l; i++) {
       if( flags[jsonPagesArray[0].content[i].MAHANG]) continue;
       flags[jsonPagesArray[0].content[i].MAHANG] = true;
       output.push(jsonPagesArray[0].content[i].MAHANG);
       }
   
       // console.log(output)   
       for (var i =0; i < output.length; i++){
        db.query('wacoal_CONGDOAN_MAHANG_CHIDB_Delete_Before_Import_Excel_Web_V1 @MAHANG=:MAHANG',{
          replacements:{MAHANG:output[i]}
        }).then(result => {
   
        }).catch(err => {
          console.log(err);
        })
       }
       
     for (var i = 0 ; i <jsonPagesArray[0].content.length; i++){
        db.query(`wacoal_CONGDOAN_MAHANG_CHIDB_Insert_Excel_V3 
        @MAHANG=:MAHANG,
        @MAUMH=:MAUMH,
        @CONGDOAN=:CONGDOAN ,
        @CONGDOAN_NAME_VN=:CONGDOAN_NAME_VN,
        @LOAIMAY=:LOAIMAY,
        @VITRICHI=:VITRICHI,
        @LOAICHI=:LOAICHI,
        @MAUNL=:MAUNL,
        @MAUCHI=:MAUCHI,
        @BIENDO=:BIENDO, 
        @MATDO=:MATDO, 
        @CHIEUDAI_CONGDOAN=:CHIEUDAI_CONGDOAN, 
        @UserName=:UserName
        `,{
         replacements: {
           MAHANG: jsonPagesArray[0].content[i].MAHANG,
           MAUMH:jsonPagesArray[0].content[i].MAUMH,
           CONGDOAN:jsonPagesArray[0].content[i].CONGDOAN,
           CONGDOAN_NAME_VN:jsonPagesArray[0].content[i].CONGDOAN_NAME_VN,
           LOAIMAY:jsonPagesArray[0].content[i].LOAIMAY,
           VITRICHI:jsonPagesArray[0].content[i].VITRICHI,
           LOAICHI:jsonPagesArray[0].content[i].LOAICHI,
           MAUNL:jsonPagesArray[0].content[i].MAUNL,
           MAUCHI:jsonPagesArray[0].content[i].MAUCHI,
           BIENDO:jsonPagesArray[0].content[i].BIENDO,
           MATDO:jsonPagesArray[0].content[i].MATDO,
           CHIEUDAI_CONGDOAN:jsonPagesArray[0].content[i].CHIEUDAI_CONGDOAN,
           UserName:req.signedCookies.userId,
        }
       }).catch(err => {
       //   console.log(er.message)
         message=('err',err);
         messageStatus='err';
         return res.redirect('/kho/CDMHchikhacmauinput');
       }); 
     }
     // console.log(super_array);
     del(['./public/excel/'+filename]);
       message='Import excel file successfull';
       messageStatus='ok';
       return res.redirect('/kho/CDMHchikhacmauinput');
   }});
   
   } catch (error) {
     // console.log(error.message);
     message = ('err',error);
     messageStatus='err';
     return res.redirect('/kho/CDMHchikhacmauinput');
   }
    
}