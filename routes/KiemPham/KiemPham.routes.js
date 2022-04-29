const express = require('express');
const router = express.Router();
const QuyTrinhKiemPhamControl= require('../../Controlers/KiemPham/KiemPham.Control');
//Quy trinh kiem pham
router.get('/QTKP', QuyTrinhKiemPhamControl.QuyTrinhKiemPham);

// KIEMMAUSENPATSU
router.get('/KIEMMAUSENPATSU', QuyTrinhKiemPhamControl.KIEMMAUSENPATSU);

// LAM_HUONG_DAN_KIEM
router.get('/LAM_HUONG_DAN_KIEM', QuyTrinhKiemPhamControl.LAM_HUONG_DAN_KIEM);
// GIAI_THICH_BANG_HUONG_DAN_KIEM_TRA
router.get('/GIAI_THICH_BANG_HUONG_DAN_KIEM_TRA', QuyTrinhKiemPhamControl.GIAI_THICH_BANG_HUONG_DAN_KIEM_TRA);
// LEADER_KIEM_TRA
router.get('/LEADER_KIEM_TRA', QuyTrinhKiemPhamControl.LEADER_KIEM_TRA);
// CONG_NHAN_KIEM_SX_THAT
router.get('/CONG_NHAN_KIEM_SX_THAT', QuyTrinhKiemPhamControl.CONG_NHAN_KIEM_SX_THAT);
// GIAOHANG
router.get('/GIAOHANG', QuyTrinhKiemPhamControl.GIAOHANG);
// QD_XLSP_KHONG_PHU_HOP
router.get('/QD_XLSP_KHONG_PHU_HOP', QuyTrinhKiemPhamControl.QD_XLSP_KHONG_PHU_HOP);
module.exports = router;