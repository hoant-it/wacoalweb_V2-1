const db= require('../../databases/database').sequelize;
module.exports.RuleInRoleLoad= async( req, res ) => {
    const{roleCode}=req.params;
 
    try {
        await db.query('wacoal_Rule_In_Role_Load_Web_V1 @GroupUserCode=:GroupUserCode',{
            replacements:{GroupUserCode:roleCode}
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

module.exports.ListPermisionGroupLoad = async( req, res ) => {
    const{roleCode}=req.params;
 
    try {
        await db.query('wacoal_ListPermisionGroup_Load_web_V1 @GroupUserCode=:GroupUserCode',{
            replacements:{GroupUserCode:roleCode}
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

module.exports.UserInRoleLoad= async( req, res ) => {
    const{roleCode}=req.params;
 
    try {
        await db.query('wacoal_UserInRole_Load_Web_V1 @GroupUserCode=:GroupUserCode',{
            replacements:{GroupUserCode:roleCode}
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

module.exports.UserListLoad =async( req, res ) => {
    try {
        await db.query('wacoal_ListUser_load_v1 ',{
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