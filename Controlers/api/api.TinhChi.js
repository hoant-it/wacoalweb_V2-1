const db=require('../../databases/database').sequelize;

module.exports.khoOrderTinhchiGridview=async( req, res ) => {
    const{Order,KhachHang}=req.params;
 console.log(req.params);
      
    try {
        await db.query('wacoal_Load_TinhChiOrder_V6 @ORDERNO=:ORDERNO, @MAKH=:MAKH ',{
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

module.exports.khoOrderTinhchiGridviewMaHangMiss=async( req, res ) => {
    const{Order,KhachHang}=req.params;
 console.log(req.params);
      
    try {
        await db.query('wacoal_OrderTinhChiMaHangMiss_Web_v1 @ORDERNO=:ORDERNO, @MAKH=:MAKH ',{
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


    module.exports.wacoal_VITRICHIITEM_Load_Web_V1= async(req,res) => {
        try {
            await db.query(`wacoal_VITRICHIITEM_Load_Web_V1`,{

            }).then(result=> {
                res.json({
                    data:result[0]
                })
            })
            
        } catch (error) {
            res.json({
                data:result[0],
                message:`Error: ${error.parent.message}`
            })
        }
    }


    // tinh chi theo Ma Hang
    module.exports.wacoal_TinhChi_MaHang_V1=async( req, res ) => {
        const{MAHANG}=req.params;
     console.log(req.params);
          
        try {
            await db.query('wacoal_TinhChi_MaHang_V1 @MAHANG=:MAHANG ',{
                replacements:{MAHANG:  MAHANG}
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

    //Danh Sách Màu Nguyên Liệu - Loại Chỉ mới

    module.exports.wacoal_MauNL_LoaiChi_Moi_Load_Web_V1=async( req, res ) => {
        const{MAHANG}=req.params;
     console.log(req.params);
          
        try {
            await db.query('wacoal_MauNL_LoaiChi_Moi_Load_Web_V1',{
                replacements:{}
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

