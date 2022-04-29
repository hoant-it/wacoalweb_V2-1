const db = require('../../databases/database').sequelize;
const xlsx = require('xlsx');
const del = require('del');

module.exports.MauNLMauMaHangGet= async(req,res) => {
    res.render('kho/MauNL_MauMH_input', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: '',
        message: '',
        messageStatus: ''
    })
}

module.exports.MauNLMauMaHangPost= async(req,res) => {let message = '';
let messageStatus = '';
const format = ["MAHANG", "MAUMH", "MAUNL"]
var file = req.files.filename;
//   console.log(file);
var filename = file.name;
//   console.log(filename);
file.mv('./public/excel/' + filename, (err) => {
    if (err) {
        message = ('err', err);
        messageStatus = 'err';
        del(['./public/excel/' + filename]);
        return  res.render('kho/MauNL_MauMH_input', {
            title: 'Express',
            userId: req.signedCookies.userId,
            html: '',
            message: message,
            messageStatus: messageStatus
        })
    }
    const workbook = xlsx.readFile('./public/excel/' + filename);
    const sheet_name_list = workbook.SheetNames;
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    var i = 0;
    for (let cell in worksheet) {
        if (i === 1 && worksheet[cell].v !== format[0]) {
            message = 'excel File not in Format input';
            messageStatus = 'err';
            del(['./public/excel/' + filename]);
          return  res.render('kho/MauNL_MauMH_input', {
                title: 'Express',
                userId: req.signedCookies.userId,
                html: '',
                message: message,
                messageStatus: messageStatus
            })
        }
        if (i === 2 && worksheet[cell].v !== format[1]) {
            message = 'excel File not in Format input';
            messageStatus = 'err';
            del(['./public/excel/' + filename]);
            return  res.render('kho/MauNL_MauMH_input', {
                title: 'Express',
                userId: req.signedCookies.userId,
                html: '',
                message: message,
                messageStatus: messageStatus
            })
        }
        if (i === 3 && worksheet[cell].v !== format[2]) {
            message = 'excel File not in Format input';
            messageStatus = 'err';
            del(['./public/excel/' + filename]);
            return  res.render('kho/MauNL_MauMH_input', {
                title: 'Express',
                userId: req.signedCookies.userId,
                html: '',
                message: message,
                messageStatus: messageStatus
            })
        }
        i++;
    }

    let jsonPagesArray = [];
    sheet_name_list.forEach(function(sheet) {
        const jsonPage = {
            name: sheet,
            content: JSON.parse(JSON.stringify(xlsx.utils.sheet_to_json(workbook.Sheets[sheet], {
                defval: ""
            })))
        };
        jsonPagesArray.push(jsonPage);
    });
    for (let j = 0; j < jsonPagesArray[0].content.length; j++) {
        const MaHang = jsonPagesArray[0].content[j].MAHANG;
        const MauMH = jsonPagesArray[0].content[j].MAUMH;
        const MauNL = jsonPagesArray[0].content[j].MAUNL;
        try {
            db.query(`wacoal_MAUNL_MAHANG_Insert_V2 
            @MAHANG=:MAHANG,
            @MAUMH=:MAUMH ,
            @MAUNL=:MAUNL,
            @UserName=:UserName
            `, {
            replacements: {
                MAHANG: MaHang,
                MAUMH: MauMH,
                MAUNL: MauNL,
                UserName: req.signedCookies.userId
                }
            })
        } catch (error) {
            console.log(error.parent.message);
        }
    }

    message = 'Import excel file successfull';
    messageStatus = 'ok';
    del(['./public/excel/' + filename]);
    return res.render('kho/MauNL_MauMH_input', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: '',
        message: message,
        messageStatus: messageStatus
    })
});

}