const db =require('../../databases/database').sequelize;

module.exports.LoaiMayLoad= async(req,res) => {
    res.render("kho/LoaiMay", {
        title: 'Wacoal Website-Loai May',
        userId: req.signedCookies.userId,
        html: '',
    });

}

module.exports.LoaiMayUpdate= async (req,res) =>{
    console.log(req.body);
    let lMes={}
    const {LoaiMay, LoaiMayNameVN, LoaiMayNameEN,status}=req.body;
    if(status==='submitInsert'){
        try {
            await db.query(`wacoal_LoaiMay_Insert_Web_V1 
            @LOAIMAY=:LOAIMAY,
            @LOAIMAY_NAME_VN=:LOAIMAY_NAME_VN,
            @LOAIMAY_NAME_EN=:LOAIMAY_NAME_EN,
            @UserName=:UserName`,{
                replacements:{LOAIMAY:LoaiMay,
                    LOAIMAY_NAME_VN:LoaiMayNameVN,
                    LOAIMAY_NAME_EN:LoaiMayNameEN,
                    UserName:req.signedCookies.userId
                }
            }).then(result => {
                console.log(result);
                lMes.statusErr=true;
                lMes.errMes="Cập Nhật thành công";

            })
        } catch (error) {
            lMes.statusErr=false;
            lMes.errMes=`Err:  ${error.parent.message}`;
        }
    }
    if(status==='submitEdit'){
        try {
            await db.query(`wacoal_LoaiMay_Update_Web_V1 
            @LOAIMAY=:LOAIMAY,
            @LOAIMAY_NAME_VN=:LOAIMAY_NAME_VN,
            @LOAIMAY_NAME_EN=:LOAIMAY_NAME_EN,
            @UserName=:UserName`,{
                replacements:{LOAIMAY:LoaiMay,
                    LOAIMAY_NAME_VN:LoaiMayNameVN,
                    LOAIMAY_NAME_EN:LoaiMayNameEN,
                    UserName:req.signedCookies.userId
                }
            }).then(result => {
                console.log(result);
                lMes.statusErr=true;
                lMes.errMes="Cập Nhật thành công";

            })
        } catch (error) {
            lMes.statusErr=false;
            lMes.errMes=`Err: ${error.parent.message}`;
        }
    }
    res.send(lMes);
}

module.exports.LoaiMayDelete = async (req,res) => {
    let lMes={}
    const {LoaiMay}=req.body;
    try {
        await db.query(`wacoal_LoaiMay_Delete_Web_V1 @LOAIMAY=:LOAIMAY`,{
            replacements:{LOAIMAY:LoaiMay}
        }).then(result=>{
            console.log(result);
                lMes.statusErr=true;
                lMes.errMes="Xóa thành công";
        })
        
    } catch (error) {
        lMes.statusErr=false;
        lMes.errMes=`Err: ${error.parent.message}`;
    }
    res.send(lMes);
}

