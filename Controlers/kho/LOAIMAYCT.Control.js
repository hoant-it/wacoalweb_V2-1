

module.exports.LoaiMayCTLoad= async(req,res) => {
    res.render("kho/LOAIMAYCT", {
        title: 'Wacoal Website-Loai May',
        userId: req.signedCookies.userId,
        html: '',
    });

}