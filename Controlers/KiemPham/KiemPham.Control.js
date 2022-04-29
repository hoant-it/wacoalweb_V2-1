module.exports.QuyTrinhKiemPham= async(req,res) =>{
    res.render('KiemPham/QTKP',{
        title:'Express',
        userId:req.signedCookies.userId,
       html:''
    })
    }

// KIEMMAUSENPATSU
module.exports.KIEMMAUSENPATSU= async(req,res) =>{
    res.render('KiemPham/KIEMMAUSENPATSU',{
        title:'Express',
        userId:req.signedCookies.userId,
        html:''
    })
    }
// LAM_HUONG_DAN_KIEM
module.exports.LAM_HUONG_DAN_KIEM= async(req,res) =>{
    res.render('KiemPham/LAM_HUONG_DAN_KIEM',{
    title:'Express',
    userId:req.signedCookies.userId,
    html:''
    })
}
// GIAI_THICH_BANG_HUONG_DAN_KIEM_TRA
module.exports.GIAI_THICH_BANG_HUONG_DAN_KIEM_TRA= async(req,res) =>{
res.render('KiemPham/GIAI_THICH_BANG_HUONG_DAN_KIEM_TRA',{
    title:'Express',
    userId:req.signedCookies.userId,
    html:''
})
}
// LEADER_KIEM_TRA
module.exports.LEADER_KIEM_TRA= async(req,res) =>{
    res.render('KiemPham/LEADER_KIEM_TRA',{
        title:'Express',
        userId:req.signedCookies.userId,
        html:''
    })
    }
// CONG_NHAN_KIEM_SX_THAT
module.exports.CONG_NHAN_KIEM_SX_THAT= async(req,res) =>{
    res.render('KiemPham/CONG_NHAN_KIEM_SX_THAT',{
        title:'Express',
        userId:req.signedCookies.userId,
        html:''
    })
    }
// GIAOHANG
module.exports.GIAOHANG= async(req,res) =>{
    res.render('KiemPham/GIAOHANG',{
        title:'Express',
        userId:req.signedCookies.userId,
        html:''
    })
    }
// QD_XLSP_KHONG_PHU_HOP
module.exports.QD_XLSP_KHONG_PHU_HOP= async(req,res) =>{
    res.render('KiemPham/QD_XLSP_KHONG_PHU_HOP',{
        title:'Express',
        userId:req.signedCookies.userId,
        html:''
    })
    }



