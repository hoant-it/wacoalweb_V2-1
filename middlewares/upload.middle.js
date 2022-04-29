const multer = require("multer");
const CryptoJS = require("crypto-js");
// const excelFilter = (req, file, cb) => {
//   console.log(file.mimetype)
//   if (
//     file.mimetype.includes("excel") ||
//     file.mimetype.includes("spreadsheetml")
//   ) {
//     cb(null, true);
//   } else {
//     cb("Please upload only excel file.", false);
//   }
// };
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/excel/");
  },
  filename: (req, file, cb) => {
    // console.log(file.originalname);
    cb(null, `${file.originalname}`,
    // `${Date.now()}-bezkoder-${file.originalname}`
    );
  },
});

var storageVideo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/video/");
  },
  filename: (req, file, cb) => {
    let bytes =  CryptoJS.AES.encrypt(file.originalnam, "secret key 123")
    .toString()
    .replace(/[&\/\\#,+()$~%.'":*?<>{}=]/g, "");
    // console.log(file.originalname);
    cb(null, `${bytes}.mp4`,
    // `${Date.now()}-bezkoder-${file.originalname}`
    );
  },
});


module.exports.uploadFileExcel = multer({ storage: storage});
module.exports.uploadFileVideo = multer({ storage: storageVideo});

// var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
// module.exports = uploadFile;