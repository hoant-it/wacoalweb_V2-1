const db= require('../../databases/database').sequelize;
module.exports.MauChiMauNLLoad= async (req,res) => {
    try {
        await db.query(`wacoal_MAUCHIMAUNL_Load_Web_V1`,{

        }).then(result => {
            res.json({
                data: result[0],
            })
        })
        
    } catch (error) {
        res.json({
            data:{},
            message:`Query Failed. Error: ${error.parent.message}`
        })
    }
}