var express = require('express');
var router = express.Router();
const db= require('../databases/database').sequelize;
var CryptoJS = require("crypto-js");
var milderedirectHome= require('../middlewares/middle.redirectHome').redirectHome;
var controlLogin=require('../Controlers/control.Login');

router.get('/',milderedirectHome, async(req,res) =>{
  res.render('login',{
    messageError:"",
    html:""
  });
});

router.post('/',milderedirectHome,controlLogin.LoginAjax);
// return;
// async(req,res) =>{
//   // var localdata = localStorage.getItem('my_key'); 
//   const{userName,password}= req.body
//   var dataUserA=[]
//   await db.query('sp_Wacoal_Web_ListUserGetRole @UserName=:UserName',{
//     replacements: { UserName: userName.toUpperCase()},
//   }).then(results => {
//   dataUserA=results[0];
//   // console.log(dataUserA);
//   })
//     if(dataUserA.length<1){
//       res.render('login',{
//         messageError:"User Name không tồn tại",
//         html:""
//       });
//     }
//     else{
//       var bytes = CryptoJS.AES.decrypt(dataUserA[0].WebPass, 'itsasecret123');
//       // Chuyển sang chuỗi gốc
//       var message_decode = bytes.toString(CryptoJS.enc.Utf8);
//       // console.log(`chuỗi đã được giải mã hóa : ${message_decode}`);
//       // console.log(`pass la  : ${req.body.password}`);
//       if(message_decode===password){
//         res.cookie('userId',userName,{
//           signed:true
//         })
//         res.cookie('IDAuthorization',dataUserA[0].IDAuthorization,{
//           signed:true
//         })
//         res.cookie('UserInGroupID',dataUserA[0].UserInGroupID,{
//           signed:true
//         })
//         res.redirect('/home')
//       }
//       else{
//         return  res.render('login',{
//           messageError:"Password không đúng",
//           html:""
//         });
//         // res.redirect('/Login')
//       }
//     }
// });

module.exports = router;