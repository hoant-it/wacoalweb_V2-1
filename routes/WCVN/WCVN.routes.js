const express = require('express');
const router = express.Router();
const VNWCControl= require('../../Controlers/VNWC/VNWC.Control');
const homeMiddle= require('../../middlewares/home/home.middle');


router.get('/VNWC_SDTC',homeMiddle.redirectLogin, VNWCControl.WCVN_SDTC);

module.exports = router;