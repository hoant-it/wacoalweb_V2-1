var express = require('express');
var router = express.Router();

router.get('/', async(req,res) =>{
    res.render('QRCodeScan',{
      title:'QR Code Scan',
      userId:req.signedCookies.userId,
      html:''
    });
  });

  module.exports=router;