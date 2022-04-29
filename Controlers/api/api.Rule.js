const db= require('../../databases/database').sequelize;
module.exports.MenuListByRuleLoad= async(req,res) => {
    const{ruleCode}=req.params
    try {
        await db.query("wacoal_ListMenu_By_Rule_Load_Web_v2 @PermisionGroupCode=:PermisionGroupCode ",{
            replacements:{PermisionGroupCode:ruleCode}

        }).then(function(data){
            res.json({
                // result:"ok",
                data:data[0],
                // message:'query list NGGROUPASSYPR sucessfully'
            })
        })
        
    } catch (error) {
        res.json({
            result:"failed",
            data:{},
            message:`Query Failed. Error: ${error}`
        })
    };
}

module.exports.MenuListLoadWeb= async( req, res) => {
    const{ruleCode}=req.params
    try {
        await db.query('wacoal_ListMenu_Load_web_V1 @PermisionGroupCode=:PermisionGroupCode',{
            replacements:{PermisionGroupCode:ruleCode}
        }).then(data=>{
            res.json({
                data:data[0],
                message:'ok'
            })
        }).catch(err => {
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