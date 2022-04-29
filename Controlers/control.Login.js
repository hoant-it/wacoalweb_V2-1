var db=require('../databases/database').sequelize;
var CryptoJS = require("crypto-js");

module.exports.LoginAjax= async(req,res) =>{
    const{userName,password}= req.body;
    var messageError="";
  var dataUserA=[]
  await db.query('sp_Wacoal_Web_ListUserGetRole @UserName=:UserName',{
    replacements: { UserName: userName.toUpperCase()},
  }).then(results => {
  dataUserA=results[0];
  // console.log(dataUserA);
  })
    if(dataUserA.length<1){
        // messageError="User Name không tồn tại";
        // res.send(messageError);
      res.render('login',{
        messageError:"User Name không tồn tại",
        html:""
      });
    }
    else{
      var bytes = CryptoJS.AES.decrypt(dataUserA[0].WebPass.toString(), 'itsasecret123');
      let webLoginFist=dataUserA[0].WebLoginFrist
      // Chuyển sang chuỗi gốc
      var message_decode = bytes.toString(CryptoJS.enc.Utf8);

      // var bytes2 = CryptoJS.AES.decrypt('qs1qLTvbgwNFRB6sbEj1T1YzW+vK++zh80k5LU4pqC4=', 'itsasecret123');
      // var message_decode2 = bytes2.toString(CryptoJS.enc.Utf8);
      // console.log(`chuỗi đã được giải mã hóa : ${message_decode2}`);
      // console.log(`pass la  : ${req.body.password}`);
      if(message_decode===password){
        res.cookie('userId',userName,{
          signed:true
        })
        res.cookie('IDAuthorization',dataUserA[0].IDAuthorization,{
          signed:true
        })
        res.cookie('UserInGroupID',dataUserA[0].UserInGroupID,{
          signed:true
        })
         res.cookie('webLoginFist',webLoginFist,{
          signed:true
        })
          res.redirect('/home')
      }
      else{
        res.render('login',{
          messageError:"Password không đúng",
         
        });
        // res.redirect('/Login')
      }
    }
}