var express = require('express');
var router = express.Router();
const db= require('../databases/database').sequelize;
var CryptoJS = require("crypto-js");

router.get('/', async(req,res) =>{
  res.render('changePassword',{
    title:'Express',
    userId:req.signedCookies.userId,
    html:''
  });
});


router.post('/', async (req, res) => {

   try {
     const passwordRegex=new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    var passwordweb='';
    var messErr='';
    console.log(req.body);
    const{UserId,Currentpassword,Newpassword,ConfirmPassword}=req.body;
    await db.query('ListUser_WebPassGet_web_V1 @UserName=:UserName',
    {replacements:{
        UserName:UserId
    }}).then(result => {
             passwordweb=result[0][0].WebPass
        // console.log(passwordweb);
    }).catch(err => {
        messErr=('Error',err.parent.message);
        res.send(messErr);
    });

    var bytes = CryptoJS.AES.decrypt(passwordweb, 'itsasecret123');
    // Chuyển sang chuỗi gốc
    var message_decode = bytes.toString(CryptoJS.enc.Utf8);
    console.log(Currentpassword);
    console.log(message_decode);
    if(message_decode!==Currentpassword){
        messErr='Error: Mật khẩu hiện tại không đúng!';
        res.send(messErr);
    }else{
      if(Newpassword!==ConfirmPassword){
        messErr='Error: Mật khẩu mới và xác nhận không trùng khớp';
        res.send(messErr);
      } 
      // else if(passwordRegex.test(Newpassword)===false){
      //   messErr='Error: Mật khẩu mới phải có tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số ';
      //   res.send(messErr);
      // }
       else{
        // Mã hóa
        var message = CryptoJS.AES.encrypt(Newpassword, 'itsasecret123').toString();
        console.log(message);
        await db.query(`ListUser_WebPassUpdate_web_V1 
        @UserName=:UserName,
        @WebPass=:WebPass
        `,{
          replacements:{UserName:UserId,WebPass:message}
        }).then(result => {
          messErr=('ok');
          res.send(messErr);
        }).catch(err => {
          messErr=('Error: ',err.parent.message);
          res.send(messErr);
        })
      }
    }
       
   } catch (error) {
    messErr=('Error: ',error.parent.message);
    res.send(messErr);
   }

});

module.exports = router;