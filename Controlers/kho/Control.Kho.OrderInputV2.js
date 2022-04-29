const db= require('../../databases/database').sequelize;
const xlsx= require('xlsx');
const del=require('del')

let message='',
messageStatus=''

module.exports.OrderInputV2Load= async (req, res ) => {
    res.render('kho/KhoOrderInputV2',{
        title:'Việt Nam Wacoal Website',
        userId:req.signedCookies.userId,
        html:'',
        message: message,
        messageStatus:messageStatus
    })
    message='';
    messageStatus=''
}

module.exports.OrderInputV2Post= (req,res) =>{
    try {
     const format=["ORDERNO","MAKH","TENKH","UNIT","MAHANG","MAUMH","QTY"]
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
        return res.redirect('/kho/inputorderv2');
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
             return res.redirect('/kho/inputorderv2');
          }
          if(i===2 && worksheet[cell].v !== format[1] ){
            message='excel File not in Format input';
            messageStatus='err';
           return res.redirect('/kho/inputorderv2');
        
          }
          if(i===3 && worksheet[cell].v !== format[2] ){
            message='excel File not in Format input';
            messageStatus='err';
           return res.redirect('/kho/inputorderv2');
          }
          if(i===4 && worksheet[cell].v !== format[3] ){
            message='excel File not in Format input';
            messageStatus='err';
           return res.redirect('/kho/inputorderv2');
          }
          if(i===5 && worksheet[cell].v !== format[4] ){
            message='excel File not in Format input';
            messageStatus='err';
           return res.redirect('/kho/inputorderv2');
          }
          if(i===6 && worksheet[cell].v !== format[5] ){
            message='excel File not in Format input';
            messageStatus='err';
           return res.redirect('/kho/inputorderv2');
          }
          if(i===7 && worksheet[cell].v !== format[6] ){
            message='excel File not in Format input';
            messageStatus='err';
           return res.redirect('/kho/inputorderv2');
          }
         
          // console.log(cellAsString[1]);
          // console.log(cellAsString);
            if(cellAsString[1]!=='r' && cellAsString !== 'm'  && i>7){
                if(cellAsString[0]==='A'){
                post.ORDERNO=worksheet[cell].v;
                }
                if(cellAsString[0]==='B'){
                post.MAKH=worksheet[cell].v;
                }
                if(cellAsString[0]==='C'){
                post.TENKH=worksheet[cell].v;
                }
                if(cellAsString[0]==='D'){
                    post.UNIT=worksheet[cell].v;
                }
                if(cellAsString[0]==='E'){
                    post.MAHANG=worksheet[cell].v;
                }
                if(cellAsString[0]==='F'){
                    post.MAUMH=worksheet[cell].v;
                }
                if(cellAsString[0]==='G'){
                    post.QTY=worksheet[cell].v;
                    posts.push(post);
                    post = {};
                }
          }
          i++;
        }
      }
      console.log(posts.length);
      console.log(posts[0]);  
    //   var super_array =[];
      for (let i = 0 ; i <posts.length; i++){
         db.query(`wacoal_ORDERITEM_Insert_V4 @ORDERNO=:ORDERNO, @MAKH=:MAKH , @TENKH=:TENKH, @UNIT=:UNIT, @MAHANG=:MAHANG,
         @MAUMH=:MAUMH, @QTY=:QTY, @USERNAME=:USERNAME`,{
          replacements: {
            ORDERNO: posts[i].ORDERNO,
            MAKH:posts[i].MAKH,
            TENKH:posts[i].TENKH,
            UNIT:posts[i].UNIT,
            MAHANG:posts[i].MAHANG,
            MAUMH:posts[i].MAUMH,
            QTY:posts[i].QTY,
            USERNAME:req.signedCookies.userId,
         }
        }).catch(err => {
          console.log(er.message)
          message=('err',err);
          messageStatus='err';
          return res.redirect('/kho/inputorderv2');
        }); 
      }
    //   console.log(super_array);
      del(['./public/excel/'+filename]);
        message='Import excel file successfull';
        messageStatus='ok';
        return res.redirect('/kho/inputorderv2');
    });
    
    } catch (error) {
      // console.log(error.message);
      message = ('err',error);
      messageStatus='err';
      return res.redirect('/kho/inputorderv2');
    }
    }