var express = require('express');
var router = express.Router();
const db= require('../../databases/database').sequelize;
const xlsx= require('xlsx');
const del=require('del');


var message='';
var messageStatus=''
router.get('/', (req,res) => {
  console.log(message);
res.render('kho/KhoDMCInput',{
    title:'Express',
    userId:req.signedCookies.userId,
    html:'',
    message: message,
    messageStatus:messageStatus
})
message='';
messageStatus=''
});
// import excel file vao he thong
router.post('/', async(req,res) =>{
try {
 const format=["PRODUCTCODE","COLORCODE","CONGDOANCODE","MACHINECODE","MACHINENAME_VN","CONGDOAN_DAY_MONG","BIENDO","MATDO","CHIEUDAI","LOAICHICODE","VITRICHI"]
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
    return res.redirect('/kho/DMCInput');
  } else {
    const workbook=xlsx.readFile('./public/excel/'+filename);
    const worksheet= workbook.Sheets[workbook.SheetNames[0]];
    let post={};
   var i=0;
    for(let cell in worksheet){
      const cellAsString = cell.toString();
      // console.log(cellAsString);
      console.log(worksheet[cell].v +' ' +i);
      if(i===1 && worksheet[cell].v !== format[0] ){
          message='excel File not in Format input';
          messageStatus='err';
         return res.redirect('/kho/DMCInput');
      }
      if(i===2 && worksheet[cell].v !== format[1] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/DMCInput');
    
      }
      if(i===3 && worksheet[cell].v !== format[2] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/DMCInput');
      }
      if(i===4 && worksheet[cell].v !== format[3] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/DMCInput');
      }
      if(i===5 && worksheet[cell].v !== format[4] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/DMCInput');
      }
      if(i===6 && worksheet[cell].v !== format[5] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/DMCInput');
      }
      if(i===7 && worksheet[cell].v !== format[6] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/DMCInput');
      }
      if(i===8 && worksheet[cell].v !== format[7] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/DMCInput');
      }
      if(i===9 && worksheet[cell].v !== format[8] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/DMCInput');
      }
      if(i===10 && worksheet[cell].v !== format[9] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/DMCInput');
      }
      if(i===11 && worksheet[cell].v !== format[10] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/DMCInput');
      }
      // console.log(cellAsString[1]);
    //   console.log(cellAsString);
        if(cellAsString[1]!=='r' && cellAsString !== 'm'  && i>11){
            if(cellAsString[0]==='A'){
            post.PRODUCTCODE=worksheet[cell].v;
            }
            if(cellAsString[0]==='B'){
            post.COLORCODE=worksheet[cell].v;
            }
            if(cellAsString[0]==='C'){
            post.CONGDOANCODE=worksheet[cell].v;
            }
            if(cellAsString[0]==='D'){
                post.MACHINECODE=worksheet[cell].v;
            }
            if(cellAsString[0]==='E'){
                post.MACHINENAME_VN=worksheet[cell].v;
            }
            if(cellAsString[0]==='F'){
                post.CONGDOAN_DAY_MONG=worksheet[cell].v;
            }
            if(cellAsString[0]==='G'){
                post.BIENDO=worksheet[cell].v;
            }
            if(cellAsString[0]==='H'){
                post.MATDO=worksheet[cell].v;
            }
            if(cellAsString[0]==='I'){
                post.CHIEUDAI=worksheet[cell].v;
            }
            if(cellAsString[0]==='J'){
                post.LOAICHICODE=worksheet[cell].v;
            }
            if(cellAsString[0]==='K'){
                post.VITRICHI=worksheet[cell].v;
                posts.push(post);
                post = {};
            }
      }
      i++;
    }
  }
  console.log(posts);
  var super_array =[];
  for (var i = 0 ; i <posts.length; i++){
     db.query(`wacoal_DMCHI_Insert_V1 
     @PRODUCTCODE=:PRODUCTCODE,
     @COLORCODE=:COLORCODE ,
     @CONGDOANCODE=:CONGDOANCODE,
     @MACHINECODE=:MACHINECODE,
     @CONGDOAN_DAY_MONG=:CONGDOAN_DAY_MONG,
     @BIENDO=:BIENDO, 
     @MATDO=:MATDO, 
     @CHIEUDAI=:CHIEUDAI, 
     @LOAICHICODE=:LOAICHICODE,
     @VITRICHI=:VITRICHI,
     @UserName=:UserName
     `,{
      replacements: {
        PRODUCTCODE: posts[i].PRODUCTCODE,
        COLORCODE:posts[i].COLORCODE,
        CONGDOANCODE:posts[i].CONGDOANCODE,
        MACHINECODE:posts[i].MACHINECODE,
        CONGDOAN_DAY_MONG:posts[i].CONGDOAN_DAY_MONG,
        BIENDO:posts[i].BIENDO,
        MATDO:posts[i].MATDO,
        CHIEUDAI:posts[i].CHIEUDAI,
        LOAICHICODE:posts[i].LOAICHICODE,
        VITRICHI:posts[i].VITRICHI,
        UserName:req.signedCookies.userId,
     }
    }).catch(err => {
    //   console.log(er.message)
      message=('err',err);
      messageStatus='err';
      return res.redirect('/kho/DMCInput');
    }); 
  }
  console.log(super_array);
  del(['./public/excel/'+filename]);
    message='Import excel file successfull';
    messageStatus='ok';
    return res.redirect('/kho/DMCInput');
});

} catch (error) {
  // console.log(error.message);
  message = ('err',error);
  messageStatus='err';
  return res.redirect('/kho/DMCInput');
}
});
module.exports = router;
