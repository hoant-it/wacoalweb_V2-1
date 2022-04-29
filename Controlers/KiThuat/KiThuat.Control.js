module.exports.QuyTrinhKiThuat = async(req,res) =>{
    res.render('KiThuat/QuyTrinhKiThuat',{
        title:'Express',
        userId:req.signedCookies.userId,
       html:''
    })
    }