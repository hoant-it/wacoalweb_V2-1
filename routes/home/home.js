const express = require('express');
const db= require('../../databases/database').sequelize;
// var CryptoJS = require("crypto-js");
const router = express.Router();
const HomeControl= require('../../Controlers/home/home.Control');
const HomeMiddle= require('../../middlewares/home/home.middle');

router.get('/',HomeMiddle.redirectLogin,HomeControl.HomeLoad);

module.exports = router;
