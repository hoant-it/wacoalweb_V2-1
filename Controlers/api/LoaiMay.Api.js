const db= require('../../databases/database').sequelize;

module.exports.wacoal_LoaiMay_Load_Web_V1= async(req, res) =>{
    try {
        await db.query(`wacoal_LoaiMay_Load_Web_V1`,{

        }).then(result => {
            res.json({
                data:result[0]
            })
        })
        
    } catch (error) {
        res.json({
            data:{},
            message:`Err: ${error.parent.message}`
        })
    }
    
}

module.exports.wacoal_LOAIMAYCT_Load_V1= async(req, res) =>{
    try {
        await db.query(`wacoal_LOAIMAYCT_Load_V1`,{

        }).then(result => {
            res.json({
                data:result[0]
            })
        })
        
    } catch (error) {
        res.json({
            data:{},
            message:`Err: ${error.parent.message}`
        })
    }
    
}