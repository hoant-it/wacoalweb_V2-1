const db =require('../../databases/database').sequelize;


module.exports.wacoal_CONGTHUCTINHCHIITEM_Load_Web_V1= async(req,res) => {
    try {
        await db.query(`wacoal_CONGTHUCTINHCHIITEM_Load_Web_V1`,{

        }).then(result => {
            res.json({
                data:result[0]
            })
        })
        
    } catch (error) {
        res.json({
            data:{},
            message:`Error: ${error.parent.message}`
        })
    }
}