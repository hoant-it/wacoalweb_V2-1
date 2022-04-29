
const db= require('../../databases/database').sequelize;

module.exports.SDTCGet = async(req,res) =>{
    res.render('kho/KhoSDTC',{
        title:'Express',
        userId:req.signedCookies.userId,
       html:'',
    })
    }


  