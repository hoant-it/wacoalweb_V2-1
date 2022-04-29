const express = require('express');
const router = express.Router();
const luckyControl= require('../../Controlers/luckynumber/luckynumberControl');
const middleWareLogin= require('../../middlewares/home/home.middle')
//Quy Trình kĩ thuật
router.get('/', luckyControl.LuckyNumberLoad);

router.get('/wacoal_PhanThuong_Load_Web_V1',luckyControl.wacoal_PhanThuong_Load_Web_V1)

router.get('/wacoal_PhanThuong_GetMaxMinNumber_Web_V1',luckyControl.wacoal_PhanThuong_GetMaxMinNumber_Web_V1)

router.get('/wacoal_ChamCong_Load_Web_V1',luckyControl.wacoal_ChamCong_Load_Web_V1);

router.post(`/wacoal_PhanThuong_Update_Web_V1/:msnvFinal/:PTSTT`,luckyControl.wacoal_PhanThuong_Update_Web_V1)

router.get('/wacoal_DSNVTRUNGTHUONG_Load_Web_V1',luckyControl.wacoal_DSNVTRUNGTHUONG_Load_Web_V1)

module.exports = router;