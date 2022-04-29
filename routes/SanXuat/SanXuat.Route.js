const express = require('express');
const router = express.Router();
const SanXuatControl = require('../../Controlers/SanXuat/SanXuat.Control');

//Quy Trình Sản Xuất
router.get('/QTSX',SanXuatControl.SXQTSX);

// NhanOrderTam
router.get('/NhanOrderTam',SanXuatControl.NhanOrderTam);

// SepKHSXTam
router.get('/SepKHSXTam',SanXuatControl.SepKHSXTam);

//XacNhanWideSCHE_DieuChinh
router.get('/XacNhanWideSCHE_DieuChinh',SanXuatControl.XacNhanWideSCHE_DieuChinh);
//NhanOrderChinhThuc
router.get('/NhanOrderChinhThuc',SanXuatControl.NhanOrderChinhThuc);
//SepKHSXChinhThuc
router.get('/SepKHSXChinhThuc',SanXuatControl.SepKHSXChinhThuc);
//XacNhanBaLance
router.get('/XacNhanBaLance',SanXuatControl.XacNhanBaLance);
module.exports = router;