const express = require('express');
const router = express.Router();
const upload= require('../../middlewares/upload.middle');
const ControlKhoMauChiMauNL = require('../../Controlers/kho/Control.Kho.MauChiMauNL');
const MiddleKhoMauChiMauNL=require('../../middlewares/kho/middle.MauchiMauNL')
const ControlKhoOrderTinhChi = require('../../Controlers/kho/Control.Kho.OrderTinhChi');
const ControlKhoSDTC = require('../../Controlers/kho/Control.Kho.SDTC');
const ControlKhoQTQLNVL = require('../../Controlers/kho/Control.Kho.QTQLNVL');
// const ControlQTDC=require('../../Controlers/kho/Control.Kho.QTDC');
const ControlKhoOerInputV2= require('../../Controlers/kho/Control.Kho.OrderInputV2');
const ControlOrderInputV3= require('../../Controlers/kho/OrderInputV3.Control');

const ControlKhoCongDoanMaHangInput= require('../../Controlers/kho/Control.Kho.CongDoanMaHangInput');
const ControlKhoCongDoanMaHangInputv2= require('../../Controlers/kho/CongDoanMaHangInputV2.Control');

const ControlKhoCDMHChiKhacMau=require('../../Controlers/kho/Control.Kho.CDMHchikhacmauinput');
const ControlKhoMauNLMaUMaHang=require('../../Controlers/kho/Control.Kho.MauNLMauMaHang');
const LoaiChiControl= require('../../Controlers/kho/LoaiChi.Control');
const LoaiMayControl= require('../../Controlers/kho/LoaiMay.Control');
const CongThucTinhChiControl=require('../../Controlers/kho/CongThucTinhChi.Control');
const VitriChiControl= require('../../Controlers/kho/VitriChi.Control');
const KhachHangControl= require('../../Controlers/kho/KhachHang.Control');
const QuyTrinhNhanHangControl=require('../../Controlers/kho/QuyTrinhNhanHang.control');
const LoauMayCTControl = require('../../Controlers/kho/LOAIMAYCT.Control');
const OrderControl= require('../../Controlers/kho/Order.Control');
const KeHangControl=require('../../Controlers/kho/KeHang.control');

//MauChi_MauNL
router.get('/MauChiMauNl', ControlKhoMauChiMauNL.MauchiMauNLLoad);
router.post('/MauChiMauNl',MiddleKhoMauChiMauNL.MauChiMauNLUpdateMiddle, ControlKhoMauChiMauNL.MauChiMauNLUpdate);
router.post('/MauChiMauNl/delete', ControlKhoMauChiMauNL.MauChiMauNLDelete);
router.post('/MauChiMauNlInput',upload.uploadFileExcel.single('filename'), ControlKhoMauChiMauNL.MauChiMauNLInputajax);
//OrderTinhChi
router.get('/KhoOderTinhChiGridViewDev',ControlKhoOrderTinhChi.OrderTinhChiLoad)
router.post('/KhoOderTinhChiGridViewDev',ControlKhoOrderTinhChi.OrderTinhChiPost)
router.get('/khoOrderTinhchiGridview/:Order/:KhachHang',ControlKhoOrderTinhChi.khoOrderTinhchiGridview)
router.get('/wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V2/:Order/:KhachHang',ControlKhoOrderTinhChi.wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V2)

router.get('/wacoal_DONHANGHEAD_Load_Web_V1',ControlKhoOrderTinhChi.wacoal_DONHANGHEAD_Load_Web_V1)

//KhoSDTC
router.get('/khoSDTC',ControlKhoSDTC.SDTCGet)
//QTQLNVL
router.get('/QTQLNVL',ControlKhoQTQLNVL.QTQLNVLGet)
//KhoQTDatChi
// router.get('KhoQTDatChi',ControlQTDC.QTDC)
//inputorderv2
router.get('/inputorderv2',ControlKhoOerInputV2.OrderInputV2Load);
router.post('/inputorderv2',ControlKhoOerInputV2.OrderInputV2Post);

//inputorderv3
router.get('/inputorderv3',ControlOrderInputV3.OrderInputV3Load);
router.post('/inputorderv3',ControlOrderInputV3.OrderInputV3Post);
//congodanmahanginput
router.get('/congodanmahanginput',ControlKhoCongDoanMaHangInput.CongDoanMaHangGet);
router.post('/congodanmahanginput',ControlKhoCongDoanMaHangInput.CongdoanMaHangPost);

//congdoangmahanginputV2
router.get('/congodanmahanginputv2',ControlKhoCongDoanMaHangInputv2.CongDoanMaHangInputV2Get);
router.post('/congodanmahanginputv2', upload.uploadFileExcel.single('filename')
, ControlKhoCongDoanMaHangInputv2.CongdoanMaHangajax
);

router.get('/CONGDOAN_MAHANG_New_Web_Load_V1',ControlKhoCongDoanMaHangInputv2.CONGDOAN_MAHANG_New_Web_Load_V1);

//order
router.get('/Order',OrderControl.OrderLoad);
router.post('/Order',OrderControl.OrderImportExcel);
router.post('/OrderDraft',upload.uploadFileExcel.single('filenameDraft'),OrderControl.OrderDraftImportExcel)
router.get('/DONHANGITEM_3_Load_Web_V1/:MY',OrderControl.DONHANGITEM_3_Load_Web_V1)
router.get('/DONHANGITEM_3_MY_SearchBox_Web_V1',OrderControl.DONHANGITEM_3_MY_SearchBox_Web_V1)
router.get('/DONHANGITEM_DRAFT_Load_Web_V1/:MY',OrderControl.DONHANGITEM_DRAFT_Load_Web_V1)
router.get('/DONHANGITEM_DRAFT_MY_SearchBox_Web_V1/',OrderControl.DONHANGITEM_DRAFT_MY_SearchBox_Web_V1)


//CDMHchikhacmauinput
router.get('/CDMHchikhacmauinput',ControlKhoCDMHChiKhacMau.CDMHChiKhacMauGet);
router.post('/CDMHchikhacmauinput',ControlKhoCDMHChiKhacMau.CDMHChiKhacMauPost);
//MauNLMauMaHang
router.get('/MauNLMauMaHang',ControlKhoMauNLMaUMaHang.MauNLMauMaHangGet);
router.post('/MauNLMauMaHang',ControlKhoMauNLMaUMaHang.MauNLMauMaHangPost);
//Loai Chi
router.get('/loaichi',LoaiChiControl.LoaiChiLoad);
router.post('/loaichi',LoaiChiControl.LoaiChiUpdate);
router.post('/loaichi/delete',LoaiChiControl.LoaiChiDelete);
// router.post('/MauNLMauMaHang',ControlKhoMauNLMaUMaHang.MauNLMauMaHangPost);
router.get('/loaimay',LoaiMayControl.LoaiMayLoad);
router.post('/loaimay',LoaiMayControl.LoaiMayUpdate);
router.post('/loaimay/delete',LoaiMayControl.LoaiMayDelete);

//CongThucTinhChi
router.get('/congthuctinhchi',CongThucTinhChiControl.CongThucTinhChiLoad);
router.post('/congthuctinhchi',CongThucTinhChiControl.CongThuCTinhchiUpdate);
router.post('/congthuctinhchi/delete',CongThucTinhChiControl.CongThucTinhChiDelete);

//Vi Tri Chi
router.get('/ViTriChi',VitriChiControl.ViTriChiLoad);
router.post('/ViTriChi',VitriChiControl.ViTriChiUpdate);
router.post('/ViTriChi/delete',VitriChiControl.VitriChiDelete);

//Khách Hàng
router.get('/KhachHang',KhachHangControl.KhachHangLoad);
router.post('/KhachHang',KhachHangControl.UpdateKhachHang);
router.post('/KhachHang/delete',KhachHangControl.KhachHangDelete);

//Lien lac nha cung cap
//LienLacThieuDu
router.get('/LienLacThieuDu',QuyTrinhNhanHangControl.LienLacThieuDu);
//LIENLACETDETAQTY
router.get('/LIENLACETDETAQTY',QuyTrinhNhanHangControl.LIENLACETDETAQTY);
//LIENLACLOINVL
router.get('/LIENLACLOINVL',QuyTrinhNhanHangControl.LIENLACLOINVL);
//LIENLACDIEUCHINHNGAYGUINVL
router.get('/LIENLACDIEUCHINHNGAYGUINVL',QuyTrinhNhanHangControl.LIENLACDIEUCHINHNGAYGUINVL);
//NHANHANG
router.get('/NHANHANG',QuyTrinhNhanHangControl.NHANHANG);
//SXNVLLENKE
router.get('/SXNVLLENKE',QuyTrinhNhanHangControl.SXNVLLENKE);
//LAYHANG
router.get('/LAYHANG',QuyTrinhNhanHangControl.LAYHANG);
//KIEMTRACHATLUONG
router.get('/KIEMTRACHATLUONG',QuyTrinhNhanHangControl.KIEMTRACHATLUONG);

//GIAOHANG
router.get('/GIAOHANG',QuyTrinhNhanHangControl.GIAOHANG);

//QLNVLDU
router.get('/QLNVLDU',QuyTrinhNhanHangControl.QLNVLDU);

//LOAIMAYCT

router.get('/LOAIMAYCT',LoauMayCTControl.LoaiMayCTLoad);

//Kệ Hàng
router.get('/kehang',KeHangControl.KeHangLoad)
router.get('/wacoal_KHONL_Web_Load_V1/:SHEFTID',KeHangControl.wacoal_KHONL_Web_Load_V1)
router.get('/wacoal_KEHANG_Web_Load_V1',KeHangControl.wacoal_KEHANG_Web_Load_V1)

router.post('/kehang',KeHangControl.SaveKeHangToDatabase)
router.get('/wacoal_KHONLXUAT_Load_By_KHONLID_web_V1/:KHONLID',KeHangControl.wacoal_KHONLXUAT_Load_By_KHONLID_web_V1)

router.get('/wacoal_KEHANG_Load_By_Id_Web_V1/:ID',KeHangControl.wacoal_KEHANG_Load_By_Id_Web_V1)


module.exports = router;