const db = require ('../../databases/database').sequelize;

module.exports.wacoal_VideoLoadWeb_V1= async (req, res ) =>{
    const{search}=req.params;
    try {
        await db.query(`wacoal_VideoLoadWeb_V1 @UserName=:UserName`,{
            replacements:{
                UserName:req.signedCookies.userId,
          
            }
        })
        .then(result => {
            res.json({
                data: result[0]

            })
            
        })
        
    } catch (error) {
        res.json({
            data:{},
            message:'Error ' + error
        })
    }


}

