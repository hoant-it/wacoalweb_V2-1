var express = require('express');
const db= require('../../databases/database').sequelize;
var router = express.Router();


router.get('/', async(req,res) =>{
res.render('WCVN/WCVN_SDTC',{
    title: 'Express' ,
    userId:req.signedCookies.userId,
    html:''
})
})

module.exports = router;