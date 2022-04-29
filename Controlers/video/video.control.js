const db = require("../../databases/database").sequelize;
const CryptoJS = require("crypto-js");
const fs = require("fs");
const QRCode = require("qrcode");
const multer= require('multer');
const ffmpeg = require("fluent-ffmpeg");

ffmpeg.setFfmpegPath('./node_modules/ffmpeg/bin/ffmpeg.exe');
ffmpeg.setFfprobePath('./node_modules/ffmpeg/bin/ffprobe.exe');


let path = "./public/video/";
let pathVideoThumbnail='./public/video/thumbnails/';


module.exports.videoLoad = async (req, res) => {
  res.render("video/videolist", {
    title: "Video List",
    userId: req.signedCookies.userId,
    html: "",
  });
};



module.exports.videoUpLoadProcessBar= async (req, res) =>{
  try {

  const file= req.file;
  let bytes= file.filename;
  // let mimetype= file.mimetype;
  let fileName= file.originalname;
  // if(mimetype!='video/mp4'){
  //   res.send('err')
  // }

  ffmpeg.ffprobe(path + bytes, function (err, metadata) {
       console.dir(metadata.format.duration);
       fileDuration=  metadata.format.duration;
     
    });

    ffmpeg(path + bytes)
      .on('filenames', function (filenames) {
        console.log('will generate ' +filenames.join(', '));
        fileThumbnail=filenames.join(', ');
        // console.log("filenames "+ filenames);
      })
      .on('end', function () {
        console.log('screenshots taken')
          db.query(
          `wacoal_Video_Insert_V2  
            @VideoName=:VideoName,
            @UserName=:UserName,
            @Encode=:Encode,
            @videoDuration=:videoDuration,
            @videoThumbnail=:videoThumbnail
  
            `,
          {
            replacements: {
              VideoName: fileName,
              UserName: req.signedCookies.userId,
              Encode: bytesa,
              videoDuration:fileDuration,
              videoThumbnail:fileThumbnail
  
            },
          }
        )
      })
      .on('error', function (err) {
        return res.send(err);
      })
      .screenshot({
        count: 1,
        folder:'./public/video/thumbnails',
        size:'320x240',
        filename:'thumbnail-%b.png'
      })

    } catch (error) {
      // lError.errMes = ("Lỗi ", error.parent.message);
      // lError.statusErr = false;
      return res.send(error);
    }

}

module.exports.videoUpLoadProcessBar1= async (req, res) =>{
  console.log(req);
  let file= req.files.file;
  let fileName= file.name;
  // let mimetype= file.mimetype;
  let bytes = CryptoJS.AES.encrypt(fileName, "secret key 123")
    .toString()
    .replace(/[&\/\\#,+()$~%.'":*?<>{}=]/g, "");

    try {
      file.mv(path + bytes + ".mp4", (err) => {
        if (err) {
          lError.errMes = ("Lỗi ", err);
          lError.statusErr = false;
          return res.send(lError);
        }

      });

      // ffmpeg.ffprobe(path + bytes + ".mp4",function (err, metadata) {
      //   // console.dir(metadata);
      //   fileDuration=metadata.format.duration;
      // })

      ffmpeg.ffprobe(path + bytes + ".mp4",function (err, metadata) {
        // console.dir(metadata);
        fileDuration=metadata.format.duration;
      })
  
      ffmpeg(path + bytes + ".mp4")
      .on('filenames', function (filenames) {
        console.log('will generate ' +filenames.join(', '));
        fileThumbnail=filenames.join(', ');
        // console.log("filenames "+ filenames);
      })
      .on('end', function () {
        console.log('screenshots taken')
        // filePath= './public/video/thumbnails'+ filenames[0]
        // console.log("filePath "+filePath)
        // fileThumbnail=filenames[0];
        db.query(
          `wacoal_Video_Insert_V2  
            @VideoName=:VideoName,
            @UserName=:UserName,
            @Encode=:Encode,
            @videoDuration=:videoDuration,
            @videoThumbnail=:videoThumbnail
  
            `,
          {
            replacements: {
              VideoName: fileName,
              UserName: req.signedCookies.userId,
              Encode: bytes,
              videoDuration:fileDuration,
              videoThumbnail:fileThumbnail
  
            },
          }
        )
        .then(()=>{
          console.log('uploaded')
          // lError.errMes = "Nhập video file" + filename + " thành công";
          // lError.statusErr = true;
          // return res.send(lError);
        })
        .catch( err =>{
          throw err;
        }
        );
  
      })
      .on('error', function (err) {
        console.error(err)
      })
      .screenshot({
        count: 1,
        folder:'./public/video/thumbnails',
        size:'320x240',
        filename:'thumbnail-%b.png'
      })
      
    } catch (error) {
      lError.errMes = ("Lỗi ", error.parent.message);
      lError.statusErr = false;
      return res.send(lError);
      
    }



}



module.exports.VideoPlayLoad = async (req, res) => {
  res.render("video/VideoPlay", {
    title: "Video Play",
    userId: req.signedCookies.userId,
    htmt: "",
  });
};

module.exports.VideoGenerateQRCode = async (req, res) => {
  const { hrefVideo } = req.body;
  var text = await QRGenerate(hrefVideo);
  //   console.log(text);
  res.send(text);
};

const QRGenerate = async (text) => {
  try {
    await QRCode.toFile(path + "video-pr-code.png", text);
    return true;
    // return await QRCode.toDataURL(text);
  } catch (error) {
    console.log(error);
  }
};

module.exports.videoQRCodeImgLoad = async (req, res) => {
  res.render("video/VideoGenerateQR", {});
};

module.exports.VideoDelete = async (req, res) => {
  var lMes = {};
  const { Id,Encode,videoThumbnail } = req.body;

  try {
    await  db.query(`VideoDeleteWeb_Wacoal_V1 @ID=:ID`, {
      replacements: {
        ID: Id,
      },
    }).then(()=>{
        let pathRemoveVideo = path + Encode + ".mp4";
        let pathRemoveVideoThumbnail = pathVideoThumbnail + videoThumbnail ;
        fs.unlinkSync(pathRemoveVideo);
        fs.unlinkSync(pathRemoveVideoThumbnail);
    })
    .catch((err) => {
        throw err;
    });

    lMes.status=true;
    lMes.mes="Xóa thành công "
    
  } catch (error) {
      lMes.status=false;
      lMes.mes=error.message;
  }
  res.send(lMes);
};

module.exports.VideoEdit = async (req, res ) =>{
    const{Id,Videoname}=req.body;
    const lMes={}
    try {
        db.query(`VideoEditWeb_Wacoal_V1 
        @VideoName=:VideoName,
        @ID=:ID,
        @UserName=:UserName
    
        `,{
            replacements:{
                VideoName:Videoname,
                ID: Id,
                UserName: req.signedCookies.userId,
            }
        }).catch(err =>{
            throw err;
        })

        lMes.status=true;
        lMes.mes="Cập nhật thành công";
        
    } catch (error) {
        lMes.status=false;
        lMes.mes=error.message;
    }
    res.send(lMes);

}