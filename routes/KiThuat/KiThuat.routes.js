const express = require('express');
const router = express.Router();
const QuyTrinhKiThuatControl= require('../../Controlers/KiThuat/KiThuat.Control');
//Quy Trình kĩ thuật
router.get('/QTKT', QuyTrinhKiThuatControl.QuyTrinhKiThuat);

module.exports = router;