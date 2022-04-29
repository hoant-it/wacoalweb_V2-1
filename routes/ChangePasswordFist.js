var express = require('express');
var router = express.Router();

router.get('/', async(req,res) =>{
    res.render('changePassword',{
      title:'changePasswordFirst',
      userId:req.signedCookies.userId,
      html:''
    });
  });

  module.exports=router