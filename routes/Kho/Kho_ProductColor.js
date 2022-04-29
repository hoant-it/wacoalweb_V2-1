var express = require('express');
const db = require('../../databases/database').sequelize;
var router = express.Router();

var _mesErr = '';

/* GET user page. */
router.get('/', async(req, res) => {
    var mess = _mesErr;
    _mesErr = '';
    // console.log('vao trang')
    var arrProductColor = [];
    await db.query("wacoal_PRODUCTCOLOR_load_V1", {

    }).then(result => {
        arrProductColor = result[0];
        //   console.log(arrProductColor);
    })
    res.render("kho/Kho_ProductColor", {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: '',
        arrProductColor: arrProductColor,
        mess: mess
    });
});

router.post('/', async(req, res, next) => {
    const {
        bsubmit, code, namevn, nameen, x
    } = req.body;
    // alert('aaa');
    // res.send('ok');
    console.log(req.body);
    if (bsubmit === "submitSave") {

        await db.query(`wacoal_PRODUCTCOLOR_Update_V1
        @COLORCODE=:COLORCODE,
        @COLORNAME_VN=:COLORNAME_VN,
        @COLORNAME_EN=:COLORNAME_EN,
        @UserName=:UserName
   `, {
                replacements: {
                    COLORCODE: code,
                    COLORNAME_VN: namevn,
                    COLORNAME_EN: nameen,
                    UserName: req.signedCookies.userId
                }
            }).then(result => {
                console.log(result);
                _mesErr = 'Update is sucessfull';
                return res.redirect('/kho/prodcolor');
            })
            .catch(err => {
                _mesErr = ('Error:', err);
                return res.redirect('/kho/prodcolor');
            })
        res.redirect('/kho/prodcolor');
    }
    if (bsubmit === 'submitAdd') {
        // console.log("dang add ne")
        await db.query(`wacoal_PRODUCTCOLOR_Insert_V1 
    @COLORCODE=:COLORCODE,
    @COLORNAME_VN=:COLORNAME_VN,
    @COLORNAME_EN=:COLORNAME_EN,
    @UserName=:UserName
    `, {
                replacements: {
                    COLORCODE: code,
                    COLORNAME_VN: namevn,
                    COLORNAME_EN: nameen,
                    UserName: req.signedCookies.userId
                }
            }).then(result => {
                console.log(result);
                _mesErr = 'Update is sucessfull';
                return res.redirect('/kho/prodcolor');
            })
            .catch(err => {
                _mesErr = ('Error:', err);
                return res.redirect('/kho/prodcolor');
            })
    }
    if (bsubmit === 'submitDelete') {
        await db.query('wacoal_PRODUCTCOLOR_Delete_V1 @COLORCODE=:COLORCODE', {
                replacements: {
                    COLORCODE: code
                }
            }).then(resulft => {
                console.log(resulft);
                _mesErr = 'Update is sucessfull';
                return res.redirect('/kho/prodcolor');
            })
            .catch(err => {
                _mesErr = ('Error:', err);
                return res.redirect('/kho/prodcolor');
             
            })
    }
});




module.exports = router;