var express = require('express');
var router = express.Router();
// const db= require('../databases/database').sequelize;
// var CryptoJS = require("crypto-js");
// var milderedirectHome= require('../middlewares/middle.redirectHome').redirectHome;

router.post('/', (req, res ) => {
    res.clearCookie("userId");
    res.clearCookie("IDAuthorization");
    res.clearCookie("UserInGroupID");
    res.redirect('/login');
})

module.exports=router;