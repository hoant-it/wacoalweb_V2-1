const express=require('express');
const router= express.Router();
const videoControler= require('../../Controlers/video/video.control');
const videoHomeControl = require('../../Controlers/video/videoHome.control')
const loginMiddleWare= require('../../middlewares/home/home.middle')
const upload= require('../../middlewares/upload.middle');
// const multer= require('multer');
// var upload= multer({dest:'./public/video/'})
// ,upload.single('filename')


router.get('/videolist',loginMiddleWare.redirectLogin,videoControler.videoLoad)
// router.post('/videolist',videoControler.videoUpLoad)
router.post('/videolist',upload.uploadFileVideo.single('file'),videoControler.videoUpLoadProcessBar)

router.get('/videoplay',videoControler.VideoPlayLoad);


router.get('/videogenerateQRCode',videoControler.videoQRCodeImgLoad);
router.post('/videogenerateQRCode',videoControler.VideoGenerateQRCode);

router.post('/deletedata',videoControler.VideoDelete);
router.post('/videoedit',videoControler.VideoEdit);


router.get('/',videoHomeControl.VideoHomeLoad);

router.get('/c/:usercreate',videoHomeControl.VideoChannelLoad);

router.get('/wacoal_VideoHomeLoad_web_V1/:search',videoHomeControl.wacoal_VideoHomeLoad_web_V1);
router.get('/c/wacoal_VideoChannelLoad_web_V1/:usercreate',videoHomeControl.wacoal_VideoChannelLoad_web_V1);

// router.get(`/c/:usercreate/wacoal_VideoChannelLoad_Search_web_V1/:userCreate/:searchChannel`,videoHomeControl.wacoal_VideoChannelLoad_Search_web_V1);

router.get(`/c/:usercreate/wacoal_VideoChannelLoad_Search_web_V1/:searchChannel`,videoHomeControl.wacoal_VideoChannelLoad_Search_web_V1);
router.get('/c/:usercreate/vcsearch',videoHomeControl.VideoSearchChannel)


router.get('/videoupload',videoHomeControl.VideoUpload)

router.get('/videosearch',videoHomeControl.VideoSearch)








module.exports =router