module.exports.QTDC= async (req, res ) => {
    res.render('Kho/KhoQTDatChi',{
        title:'Express',
        userId:req.signedCookies.userId,
       html:'',
    })
}