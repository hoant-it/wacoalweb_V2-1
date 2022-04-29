var express = require('express');
const db = require('../../databases/database').sequelize;
var router = express.Router();

var _mesErr = '';

/* GET user page. */
router.get('/', async(req, res) => {
    var mess = _mesErr;
    _mesErr = '';
    // console.log('vao trang')
    var arrProductCode = [];
    await db.query("walcoal_PRODUCTITEM_load_V1", {

    }).then(result => {
        arrProductCode = result[0];
        //   console.log(arrProductCode);
    })
    res.render("kho/KhoProducCode", {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: '',
        arrProductCode: arrProductCode,
        mess: mess
    });
});

router.post('/', async(req, res) => {
    const {
        bsubmit, code, namevn, nameen, x
    } = req.body;
    // alert('aaa');
    // res.send('ok');
    console.log(req.body);
    if (bsubmit === "submitSave") {

        await db.query(`wacoal_PRODUCTITEM_Update_V1
    @PRODUCTCODE=:PRODUCTCODE,
    @PRODUCTNAME_VN=:PRODUCTNAME_VN,
    @PRODUCTNAME_EN=:PRODUCTNAME_EN,
    @UserName=:UserName
   `, {
                replacements: {
                    PRODUCTCODE: code,
                    PRODUCTNAME_VN: namevn,
                    PRODUCTNAME_EN: nameen,
                    UserName: req.signedCookies.userId
                }
            }).then(result => {
                console.log(result);
                _mesErr = 'Update is sucessfull';
                return res.redirect('/kho/productcode');
            })
            .catch(err => {
                _mesErr = ('Error:', err);
                return res.redirect('/kho/productcode');
            })
        res.redirect('/kho/productcode');
    }
    if (bsubmit === 'submitAdd') {
        // console.log("dang add ne")
        await db.query(`wacoal_PRODUCTITEM_insert_V1 
    @PRODUCTCODE=:PRODUCTCODE,
    @PRODUCTNAME_VN=:PRODUCTNAME_VN,
    @PRODUCTNAME_EN=:PRODUCTNAME_EN,
    @UserName=:UserName
    `, {
                replacements: {
                    PRODUCTCODE: code,
                    PRODUCTNAME_VN: namevn,
                    PRODUCTNAME_EN: nameen,
                    UserName: req.signedCookies.userId
                }
            }).then(result => {
                console.log(result);
                _mesErr = 'Update is sucessfull';
                return res.redirect('/kho/productcode');
            })
            .catch(err => {
                _mesErr = ('Error:', err);
                return res.redirect('/kho/productcode');
            })
    }
    if (bsubmit === 'submitDelete') {
        await db.query('wacoal_PRODUCTITEM_delete @PRODUCTCODE=:PRODUCTCODE', {
                replacements: {
                    PRODUCTCODE: code
                }
            }).then(resulft => {
                console.log(resulft);
                _mesErr = 'Update is sucessfull';
                return res.redirect('/kho/productcode');
            })
            .catch(err => {
                _mesErr = ('Error:', err);
                return res.redirect('/kho/productcode');
                console.log(err);
            })
            // res.send('delete ok')
    }
    //   res.send('ok')
});




module.exports = router;