const db=require('../../databases/database').sequelize;

module.exports.Khowacoal_KHACHHANG_load_Web_V1=async( req, res ) => {
    //     const{Order,KhachHang}=req.params;
    //  console.log(req.params);
          
        try {
            await db.query('wacoal_KHACHHANG_load_Web_V1',{
               
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