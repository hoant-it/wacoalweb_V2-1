const db = require("../../databases/database").sequelize;


module.exports.LuckyNumberLoad = async(req,res) =>{
    res.render('LuckyNumber/luckynumber',{
        title:'Express',
        userId:req.signedCookies.userId,
       html:''
    })
    }


    module.exports.wacoal_PhanThuong_Load_Web_V1 = async (req, res) =>{
        try {
            await db.query(`wacoal_PhanThuong_Load_Web_V1`,{

            }).then(result => {
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

    
    module.exports.wacoal_PhanThuong_GetMaxMinNumber_Web_V1 = async (req, res) =>{
        try {
            await db.query(`wacoal_PhanThuong_GetMaxMinNumber_Web_V1`,{

            }).then(result => {
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

    module.exports.wacoal_ChamCong_Load_Web_V1 = async (req, res) =>{
        
        try {
            await db.query(`wacoal_ChamCong_Load_Web_V1`,{

            }).then(result => {
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

    module.exports.wacoal_PhanThuong_Update_Web_V1 = async (req, res) =>{
        const{msnvFinal,PTSTT}=req.params;
        try {
            await db.query(`wacoal_PhanThuong_Update_Web_V1 @MANV=:MANV,
            @PHANTHUONGSTT=:PHANTHUONGSTT,
            @CREATEUSER=:CREATEUSER
            `,{
                replacements:{
                    MANV:msnvFinal,
                    PHANTHUONGSTT:PTSTT,
                    CREATEUSER:req.signedCookies.userId
                }

            }).then(()=>{
                res.send("ok");
            })
            
        } catch (error) {
            res.send("Err");
            
        }
    }


    module.exports.wacoal_DSNVTRUNGTHUONG_Load_Web_V1 = async (req, res) =>{
        
        try {
            await db.query(`wacoal_DSNVTRUNGTHUONG_Load_Web_V1`,{

            }).then(result => {
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

    
    

