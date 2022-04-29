var express = require('express');
var router = express.Router();
const db= require('../../databases/database').sequelize;
const xlsx= require('xlsx');
const del=require('del');


var message='';
var messageStatus=''
router.get('/', (req,res) => {
  console.log(message);
res.render('kho/KhoOrderInput',{
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
 const format=["ORDERMONTH","ORDERYEAR","DIVISIONCODE","UNIT","PRODUCTCODE","SIZECODE","COLORCODE","QTY"]
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
    return res.redirect('kho/KhoOrderInputt');
  } else {
    const workbook=xlsx.readFile('./public/excel/'+filename);
    const worksheet= workbook.Sheets[workbook.SheetNames[0]];
    let post={};
   var i=0;
    for(let cell in worksheet){
      const cellAsString = cell.toString();
      // console.log(cellAsString);
      // console.log(worksheet[cell].v +' ' +i);
      if(i===1 && worksheet[cell].v !== format[0] ){
          message='excel File not in Format input';
          messageStatus='err';
         return res.redirect('/kho/inputOrder');
      }
      if(i===2 && worksheet[cell].v !== format[1] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/inputOrder');
    
      }
      if(i===3 && worksheet[cell].v !== format[2] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/inputOrder');
      }
      if(i===4 && worksheet[cell].v !== format[3] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/inputOrder');
      }
      if(i===5 && worksheet[cell].v !== format[4] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/inputOrder');
      }
      if(i===6 && worksheet[cell].v !== format[5] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/inputOrder');
      }
      if(i===7 && worksheet[cell].v !== format[6] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/inputOrder');
      }
      if(i===8 && worksheet[cell].v !== format[7] ){
        message='excel File not in Format input';
        messageStatus='err';
       return res.redirect('/kho/inputOrder');
      }
      // console.log(cellAsString[1]);
      // console.log(cellAsString);
        if(cellAsString[1]!=='r' && cellAsString !== 'm'  && i>8){
            if(cellAsString[0]==='A'){
            post.ORDERMONTH=worksheet[cell].v;
            }
            if(cellAsString[0]==='B'){
            post.ORDERYEAR=worksheet[cell].v;
            }
            if(cellAsString[0]==='C'){
            post.DIVISIONCODE=worksheet[cell].v;
            }
            if(cellAsString[0]==='D'){
                post.UNIT=worksheet[cell].v;
            }
            if(cellAsString[0]==='E'){
                post.PRODUCTCODE=worksheet[cell].v;
            }
            if(cellAsString[0]==='F'){
                post.SIZECODE=worksheet[cell].v;
            }
            if(cellAsString[0]==='G'){
                post.COLORCODE=worksheet[cell].v;
            }
            if(cellAsString[0]==='H'){
                post.QTY=worksheet[cell].v;
                posts.push(post);
                post = {};
            }
      }
      i++;
    }
  }
  // console.log(posts);
  var super_array =[];
  for (var i = 0 ; i <posts.length; i++){
     db.query(`wacoal_ORDERITEM_Insert_V1 @DIVISIONCODE=:DIVISIONCODE, @UNIT=:UNIT , @PRODUCTCODE=:PRODUCTCODE, @SIZECODE=:SIZECODE, @COLORCODE=:COLORCODE,
      @ORDERMONTH=:ORDERMONTH, @ORDERYEAR=:ORDERYEAR, @QTY=:QTY, @USERNAME=:USERNAME`,{
      replacements: {
        DIVISIONCODE: posts[i].DIVISIONCODE,
        UNIT:posts[i].UNIT,
        PRODUCTCODE:posts[i].PRODUCTCODE,
        SIZECODE:posts[i].SIZECODE,
        COLORCODE:posts[i].COLORCODE,
        ORDERMONTH:posts[i].ORDERMONTH,
        ORDERYEAR:posts[i].ORDERYEAR,
        QTY:posts[i].QTY,
        USERNAME:req.signedCookies.userId,
     }
    }).catch(err => {
      console.log(er.message)
      message=('err',err);
      messageStatus='err';
      return res.redirect('/kho/inputOrder');
    }); 
  }
  console.log(super_array);
  del(['./public/excel/'+filename]);
    message='Import excel file successfull';
    messageStatus='ok';
    return res.redirect('/kho/inputOrder');
});

} catch (error) {
  // console.log(error.message);
  message = ('err',error);
  messageStatus='err';
  return res.redirect('/kho/inputOrder');
}
});
module.exports = router;
