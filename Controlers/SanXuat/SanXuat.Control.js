module.exports.SXQTSX= async(req,res) =>{
    res.render('SanXuat/SXQTSX',{
        title:'Quy Trình Sản Xuất',
        userId:req.signedCookies.userId,
       html:'',
    })
    }

    // NhanOrderTam
module.exports.NhanOrderTam= async(req,res) =>{
    res.render('SanXuat/NhanOrderTam',{
        title:'Quy Trình Sản Xuất',
        userId:req.signedCookies.userId,
    html:'',
    })
}
// SepKHSXTam
module.exports.SepKHSXTam= async(req,res) =>{
    res.render('SanXuat/SepKHSXTam',{
        title:'Quy Trình Sản Xuất',
        userId:req.signedCookies.userId,
    html:'',
    })
}

// XacNhanWideSCHE_DieuChinh
module.exports.XacNhanWideSCHE_DieuChinh= async(req,res) =>{
    res.render('SanXuat/XacNhanWideSCHE_DieuChinh',{
        title:'Quy Trình Sản Xuất',
        userId:req.signedCookies.userId,
    html:'',
    })
}

// NhanOrderChinhThuc
module.exports.NhanOrderChinhThuc= async(req,res) =>{
    res.render('SanXuat/NhanOrderChinhThuc',{
        title:'Quy Trình Sản Xuất',
        userId:req.signedCookies.userId,
    html:'',
    })
}
//SepKHSXChinhThuc
module.exports.SepKHSXChinhThuc= async(req,res) =>{
    res.render('SanXuat/SepKHSXChinhThuc',{
        title:'Quy Trình Sản Xuất',
        userId:req.signedCookies.userId,
    html:'',
    })
}

//XacNhanBaLance
module.exports.XacNhanBaLance= async(req,res) =>{
    res.render('SanXuat/XacNhanBaLance',{
        title:'Quy Trình Sản Xuất',
        userId:req.signedCookies.userId,
    html:'',
    })
}
