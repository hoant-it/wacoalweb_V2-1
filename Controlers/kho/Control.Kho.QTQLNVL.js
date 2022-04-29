
const db= require('../../databases/database').sequelize;

module.exports.QTQLNVLGet = async(req,res) =>{
    res.render('Kho/Kho_QTQLNVL',{
        title:'QTQL Nguyên Liệu',
        userId:req.signedCookies.userId,
       html:''
    })
    }


  