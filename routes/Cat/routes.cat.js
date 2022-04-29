const express = require('express');
const router = express.Router();
const ControlCat=require('../../Controlers/cat/Control.cat');
const ControlCatRen=require('../../Controlers/cat/CatRen.Control')
//SDTC
router.get('/SDTC',ControlCat.CatSDTC);
//TDLCard
router.get('/TDLCard',ControlCat.CatTDLCard);
//LLKHCard
router.get('/LLKHCard',ControlCat.CatLHKHCard);
//CatMasterPattern
router.get('/CatMasterPattern',ControlCat.CatMasterPattern);
//CatGKT_Router
router.get('/GKT',ControlCat.CatGKT);

//So do quy trinh cat ren
router.get('/SDQTCatRen',ControlCatRen.SDQTCatRenGet)
//NHANRENSENPATSU
router.get('/NHANRENSENPATSU',ControlCatRen.NHANRENSENPATSU)
// THAOXEPREN_HANGSENPATSU
router.get('/THAOXEPREN_HANGSENPATSU',ControlCatRen.THAOXEPREN_HANGSENPATSU)
// GIACSODODINHMUCTUNGSIZE
router.get('/GIACSODODINHMUCTUNGSIZE',ControlCatRen.GIACSODODINHMUCTUNGSIZE)
// LAMBANGHUONGDANCATREN
router.get('/LAMBANGHUONGDANCATREN',ControlCatRen.LAMBANGHUONGDANCATREN)
// CAT_VA_KIEM_TRA_MC_VOI_PATTERN
router.get('/CAT_VA_KIEM_TRA_MC_VOI_PATTERN',ControlCatRen.CAT_VA_KIEM_TRA_MC_VOI_PATTERN)
//GIAOKYTHUAT
router.get('/GIAOKYTHUAT',ControlCatRen.GIAOKYTHUAT)
//LIENLACKHACHHANGXULY_RV
router.get('/LIENLACKHACHHANGXULY_RV',ControlCatRen.LIENLACKHACHHANGXULY_RV)
// NHAN_XEPREN_MHLL
router.get('/NHAN_XEPREN_MHLL',ControlCatRen.NHAN_XEPREN_MHLL)
module.exports=router;