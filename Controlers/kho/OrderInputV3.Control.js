const db= require('../../databases/database').sequelize;
const xlsx= require('xlsx');
const del=require('del')

let message='',
messageStatus=''

module.exports.OrderInputV3Load= async (req, res ) => {
    res.render('kho/OrderInputV3',{
        title:'Việt Nam Wacoal Website',
        userId:req.signedCookies.userId,
        html:'',
        message: message,
        messageStatus:messageStatus
    })
    message='';
    messageStatus=''
}

module.exports.OrderInputV3Post= (req,res) =>{
    try {
     const format=["MAKH","ORDERNO","MAHANG","MAUMH","QTY"]
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
        return res.redirect('/kho/inputorderv3');
      } else {
        const workbook=xlsx.readFile('./public/excel/'+filename);
        const worksheet= workbook.Sheets[workbook.SheetNames[0]];
        const sheet_name_list = workbook.SheetNames;
        // let post={};
       var i=0;

       let jsonPagesArray = [];
           sheet_name_list.forEach(function(sheet) {
               const jsonPage = {
                   name: sheet,
                   content: JSON.parse(JSON.stringify(xlsx.utils.sheet_to_json(workbook.Sheets[sheet],{defval:""})))
               };
               jsonPagesArray.push(jsonPage);
           });

        for(let cell in worksheet){
          const cellAsString = cell.toString();
          // console.log(cellAsString);
          // console.log(worksheet[cell].v +' ' +i);
          if(i===1 && worksheet[cell].v !== format[0] ){
              message='excel File not in Format input';
              messageStatus='err';
             return res.redirect('/kho/inputorderv3');
          }
          if(i===2 && worksheet[cell].v !== format[1] ){
            message='excel File not in Format input';
            messageStatus='err';
           return res.redirect('/kho/inputorderv3');
        
          }
          if(i===3 && worksheet[cell].v !== format[2] ){
            message='excel File not in Format input';
            messageStatus='err';
           return res.redirect('/kho/inputorderv3');
          }
          if(i===4 && worksheet[cell].v !== format[3] ){
            message='excel File not in Format input';
            messageStatus='err';
           return res.redirect('/kho/inputorderv3');
          }
          if(i===5 && worksheet[cell].v !== format[4] ){
            message='excel File not in Format input';
            messageStatus='err';
           return res.redirect('/kho/inputorderv3');
          }
          
         
          // console.log(cellAsString[1]);
          // console.log(cellAsString);
          //   if(cellAsString[1]!=='r' && cellAsString !== 'm'  && i>7){
          //       if(cellAsString[0]==='A'){
          //       post.ORDERNO=worksheet[cell].v;
          //       }
          //       if(cellAsString[0]==='B'){
          //       post.MAKH=worksheet[cell].v;
          //       }
          //       if(cellAsString[0]==='C'){
          //       post.TENKH=worksheet[cell].v;
          //       }
          //       if(cellAsString[0]==='D'){
          //           post.UNIT=worksheet[cell].v;
          //       }
          //       if(cellAsString[0]==='E'){
          //           post.MAHANG=worksheet[cell].v;
          //       }
          //       if(cellAsString[0]==='F'){
          //           post.MAUMH=worksheet[cell].v;
          //       }
          //       if(cellAsString[0]==='G'){
          //           post.QTY=worksheet[cell].v;
          //           posts.push(post);
          //           post = {};
          //       }
          // }
          i++;
        }

        for (let i = 0 ; i <jsonPagesArray[0].content.length; i++){
          db.query(`wacoal_ORDERITEM_Insert_V5 @MAKH=:MAKH, @ORDERNO=:ORDERNO, @MAHANG=:MAHANG, @MAUMH=:MAUMH, @QTY=:QTY, @USERNAME=:USERNAME`,{
           replacements: {
             MAKH:jsonPagesArray[0].content[i].MAKH,
             ORDERNO: jsonPagesArray[0].content[i].ORDERNO,
             MAHANG:jsonPagesArray[0].content[i].MAHANG,
             MAUMH:jsonPagesArray[0].content[i].MAUMH,
             QTY:jsonPagesArray[0].content[i].QTY,
             USERNAME:req.signedCookies.userId,
          }
         }).catch(err => {
           console.log(er.message)
           message=('err',err);
           messageStatus='err';
           return res.redirect('/kho/inputorderv3');
         }); 
       }


      }
      // console.log(posts.length);
      // console.log(posts[0]);  
    //   var super_array =[];
 
    //   console.log(super_array);
    del(['./public/excel/'+filename]);
    message='Import excel file successfull';
    messageStatus='ok';
    return res.redirect('/kho/inputorderv3');
});
    } catch (error) {
      // console.log(error.message);
      message = ('err',error);
      messageStatus='err';
      return res.redirect('/kho/inputorderv3');
    }
    }