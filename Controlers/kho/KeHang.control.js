const db= require('../../databases/database').sequelize;

module.exports.KeHangLoad= async(req,res) =>{
    const{ke}=req.query;
    console.log("ke " +ke);
    res.render('Kho/KeHang',{
        title:'Ke Hang',
        userId:req.signedCookies.userId,
        html:'',
        ke:ke,
    })
}

module.exports.wacoal_KHONL_Web_Load_V1= async(req,res) =>{
    
 try {
    const{SHEFTID}=req.params
     let result= await db.query('wacoal_KHONL_Web_Load_V1 @SHEFTID=:SHEFTID',{
         replacements:{SHEFTID:SHEFTID}
     })
     res.json({
         data:result[0]
     })
    
 } catch (error) {
    res.json({
        data:[]
    })
 }
}

module.exports.wacoal_KEHANG_Web_Load_V1= async(req,res) =>{
    try {
        let result= await db.query('wacoal_KEHANG_Web_Load_V1',{
            
        })
        res.json({
            data:result[0]
        })
       
    } catch (error) {
       res.json({
           data:[]
       })
    }
   }

module.exports.SaveKeHangToDatabase = async(req,res) =>{
    let lError={statusErr:true,errMes:'Thành Công'}
    try {
        const{btnSave,keHang,txtNL,txtOrder,txtColor,txtQty,txtUnit,txtQtyTon,txtQtyXuat,khoId}=req.body
        if(btnSave=='submitInsert'){
            await db.query(`wacoal_KeHang_Insert_web_v1 
            @SHEFTID=:SHEFTID,
            @MATERIAL=:MATERIAL,
            @ORDERNO=:ORDERNO,
            @COLOR=:COLOR,
            @QUANTITY=:QUANTITY,
            @UNIT=:UNIT,
            @UserName=:UserName
            `,{
                replacements:{
                    SHEFTID:keHang,
                    MATERIAL:txtNL,
                    ORDERNO:txtOrder,
                    COLOR:txtColor,
                    QUANTITY:txtQty,
                    UNIT:txtUnit,
                    UserName:req.signedCookies.userId
                }
            }
         )
        }
        if(btnSave=='submitEdit'){
            await db.query(`wacoal_KHONLXUAT_Insert_Web_V1 
            @KHONLID=:KHONLID,
            @QUANTITYXUAT=:QUANTITYXUAT,
            @UserName=:UserName
            `,{
                replacements:{
                    KHONLID:khoId,
                    QUANTITYXUAT:txtQtyXuat,
                    UserName:req.signedCookies.userId
                }
            })
        }
        
        res.send(lError)
    } catch (error) {
        lError.statusErr=false
        lError.errMes='Lỗi '+error
        res.send(lError)
    }
    
} 

module.exports.wacoal_KHONLXUAT_Load_By_KHONLID_web_V1= async(req,res) =>{
    
    try {
       const{KHONLID}=req.params
        let result= await db.query('wacoal_KHONLXUAT_Load_By_KHONLID_web_V1 @KHONLID=:KHONLID',{
            replacements:{KHONLID:KHONLID}
        })
        res.json({
            data:result[0]
        })
       
    } catch (error) {
       res.json({
           data:{}
       })
    }
   }


module.exports.wacoal_KEHANG_Load_By_Id_Web_V1=async(req,res)=>{
    lMes={}
    try {
        let ID =req.params.ID
        let result= await db.query('wacoal_KEHANG_Load_By_Id_Web_V1 @ID=:ID',{
            replacements:{ID:ID}
        })
        lMes.keHangName=result[0][0].SHEFTDES
        lMes.status=true
        res.send(lMes);
        
    } catch (error) {
        lMes.keHangName=error
        lMes.status=false
        res.send(lMes);
    }
}