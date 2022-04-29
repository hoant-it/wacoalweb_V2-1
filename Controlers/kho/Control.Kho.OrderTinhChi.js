
const db= require('../../databases/database').sequelize;

module.exports.OrderTinhChiLoad = async (req,res) =>{

    // var arrNamSelect=[];
    // var arrKhachHang=[];
    // await db.query('wacoal_DONHANGHEAD_Load_Web_V1').then(result => {
    //     arrNamSelect=result[0]
    // }).catch(err => {
    //     console.log(err.message);
    // })

    // await db.query('wacoal_KHACHHANG_load_Web_V1').then(result => {
    //     arrKhachHang=result[0]
    // }).catch(err => {
    //     console.log(err.message);
    // })
    // console.log(arrNamSelect);
    res.render('kho/KhoOrderTinhChiGridViewDev',{
        title:'TCTDH_wacoal',
        userId:req.signedCookies.userId,
        html:'',
        // arrNamSelect:arrNamSelect,
    })
  }


  module.exports.OrderTinhChiPost = async (req,res) =>{
    const{oderNo,khachHang}=req.body;
    var arrMaHangmiss=[];
    await db.query('wacoal_OrderTinhChiMaHangMiss_Web_v2 @ORDERNO=:ORDERNO, @MAKH=:MAKH',{
        replacements:{ORDERNO:oderNo,MAKH:khachHang}
    }
    ).then(result => {
        arrMaHangmiss=result[0];
    }).catch(err => {
        console.log(err.message);
    });
    res.send(arrMaHangmiss);
  }
  

  module.exports.khoOrderTinhchiGridview=async( req, res ) => {
    const{Order,KhachHang}=req.params;
//  console.log(req.params);
      
    try {
        await db.query('Order_TinhChi_Web_V3 @ORDERNO=:ORDERNO, @MAKH=:MAKH ',{
            replacements:{ORDERNO:  Order, MAKH:KhachHang}
        }).then(result => {
            res.json({
                data:result[0]
            })
        }).catch(err =>{
            res.json({
                data:[],
                message:"err: "+err.message
            })
        })
    } catch (error) {
        res.json({
            data:{},
            message:`Query Failed. Error: ${error}`
        })
    }
}




module.exports.wacoal_DONHANGHEAD_Load_Web_V1 =async (req, res) =>{
    try {
        await db.query('wacoal_DONHANGHEAD_Load_Web_V1',{
            replacements:{}
        }).then(result =>{
            res.json({
                data:result[0]
            })
        }).catch(err =>{
            res.json({
                data:{},
                message:`Error ${err}`
            })
        })
        
    } catch (error) {
        res.json({
            data:{},
            message:`Error ${error}`
        })
        
    }
}

module.exports.wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V2=async( req, res ) => {
    const{Order,KhachHang}=req.params;
//  console.log(req.params);
      
    try {
        await db.query('wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V3 @ORDERNO=:ORDERNO, @MAKH=:MAKH ',{
            replacements:{ORDERNO:  Order, MAKH:KhachHang}
        }).then(result => {
            res.json({
                data:result[0]
            })
        }).catch(err =>{
            res.json({
                data:[],
                message:"err: "+err.message
            })
        })
    } catch (error) {
        res.json({
            data:[],
            message:`Query Failed. Error: ${error}`
        })
    }
}