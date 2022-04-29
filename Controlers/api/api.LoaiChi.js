const db= require('../../databases/database').sequelize;

module.exports.LoaiChiLoad= async (req, res) =>{
    try {
        await db.query(`wacoal_LOAICHIITEM_Load_V1`,{}
        ).then(result => {
            res.json({
                data:result[0]
            })
        })
        
    } catch (error) {
        res.json({
            data:{},
            message:`Failed to load. Error ${error.parent.message}`
        })
    }
}

