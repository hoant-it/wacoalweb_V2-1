var express = require('express');
const db= require('../../databases/database').sequelize;
var router = express.Router();


router.get('/', async(req,res) =>{
    res.render('kho/QTKho',{
        title:'Express',
        userId:req.signedCookies.userId,
        html:'',
    })
})

module.exports = router;