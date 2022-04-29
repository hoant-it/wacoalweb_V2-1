module.exports.MayQTSX= async(req,res) =>{
    res.render('May/MayQTSX',{
        title:'QT May',
        userId:req.signedCookies.userId,
       html:'',
    })
    }