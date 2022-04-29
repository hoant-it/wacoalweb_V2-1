var express = require('express');
const db = require('../../databases/database').sequelize;
var router = express.Router();

var _mesErr = '';

/* GET user page. */
router.get('/', async(req, res) => {
    var mess = _mesErr;
    _mesErr = '';
    // console.log('vao trang')
    var arrProductSize = [];
    await db.query("wacoal_PRODUCTSIZE_Load_V1", {

    }).then(result => {
        arrProductSize = result[0];
        //   console.log(arrProductSize);
    })
    res.render("kho/KhoProoductsize", {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: '',
        arrProductSize: arrProductSize,
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

        await db.query(`wacoal_PRODUCTSIZE_Update_V1
        @SIZECODE=:SIZECODE,
        @SIZENAME_VN=:SIZENAME_VN,
        @SIZENAME_EN=:SIZENAME_EN,
        @UserName=:UserName
   `, {
                replacements: {
                    SIZECODE: code,
                    SIZENAME_VN: namevn,
                    SIZENAME_EN: nameen,
                    UserName: req.signedCookies.userId
                }
            }).then(result => {
                console.log(result);
                _mesErr = 'Update is sucessfull';
                return res.redirect('/kho/productsize');
            })
            .catch(err => {
                _mesErr = ('Error:', err);
                return res.redirect('/kho/productsize');
            })
        res.redirect('/kho/productsize');
    }
    if (bsubmit === 'submitAdd') {
        // console.log("dang add ne")
        await db.query(`wacoal_PRODUCTSIZE_Insert_V1 
    @SIZECODE=:SIZECODE,
    @SIZENAME_VN=:SIZENAME_VN,
    @SIZENAME_EN=:SIZENAME_EN,
    @UserName=:UserName
    `, {
                replacements: {
                    SIZECODE: code,
                    SIZENAME_VN: namevn,
                    SIZENAME_EN: nameen,
                    UserName: req.signedCookies.userId
                }
            }).then(result => {
                console.log(result);
                _mesErr = 'Update is sucessfull';
                return res.redirect('/kho/productsize');
            })
            .catch(err => {
                _mesErr = ('Error:', err);
                return res.redirect('/kho/productsize');
            })
    }
    if (bsubmit === 'submitDelete') {
        await db.query('wacoal_PRODUCTSIZE_Delete_V1 @SIZECODE=:SIZECODE', {
                replacements: {
                    SIZECODE: code
                }
            }).then(resulft => {
                console.log(resulft);
                _mesErr = 'Update is sucessfull';
                return res.redirect('/kho/productsize');
            })
            .catch(err => {
                _mesErr = ('Error:', err);
                return res.redirect('/kho/productsize');
             
            })
    }
});




module.exports = router;