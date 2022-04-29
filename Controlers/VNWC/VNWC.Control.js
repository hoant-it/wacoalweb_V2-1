

module.exports.WCVN_SDTC = async(req,res) =>{
    res.render('WCVN/WCVN_SDTC',{
        title: 'Sơ Đồ Tổ Chức' ,
        userId:req.signedCookies.userId,
        html:''
    })
    }