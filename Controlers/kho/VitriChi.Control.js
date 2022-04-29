const db= require('../../databases/database').sequelize;

module.exports.ViTriChiLoad= async (req, res) =>{
    res.render('kho/VitriChi',{
        title: 'Wacoal Website- Vị trí chỉ',
        userId: req.signedCookies.userId,
        html: '',
    })
}

module.exports.ViTriChiUpdate= async (req,res) => {
    let lMes={}
    const {ViTriChi,TenVitriChiVN,TenVitriChiEN,status} = req.body
    if(status==="submitInsert"){
        try {
            await db.query(`wacoal_VITRICHIITEM_Insert_Web_V1 
            @VITRICHI=:VITRICHI,
            @VITRICHINAMEVN=:VITRICHINAMEVN,
            @VITRICHINAMEEN=:VITRICHINAMEEN,
            @UserName=:UserName`,{
                replacements:{
                    VITRICHI:ViTriChi,
                    VITRICHINAMEVN:TenVitriChiVN,
                    VITRICHINAMEEN:TenVitriChiEN,
                    UserName:req.signedCookies.userId
                }
            }).then(result =>{
                console.log(result);
                lMes.statusErr=true;
                lMes.errMes="Thêm thành công";
            })
            
        } catch (error) {
            lMes.statusErr=false;
            lMes.errMes=`Error: ${error.parent.message}`;
        }
    }
    if(status==='submitEdit'){
        try {
            await db.query(`wacoal_VITRICHIITEM_Update_Web_V1 
            @VITRICHI=:VITRICHI,
            @VITRICHINAMEVN=:VITRICHINAMEVN,
            @VITRICHINAMEEN=:VITRICHINAMEEN,
            @UserName=:UserName`,{
                replacements:{
                    VITRICHI:ViTriChi,
                    VITRICHINAMEVN:TenVitriChiVN,
                    VITRICHINAMEEN:TenVitriChiEN,
                    UserName:req.signedCookies.userId
                }
            }).then(result =>{
                console.log(result);
                lMes.statusErr=true;
                lMes.errMes="Cập Nhật thành công";
            })
            
        } catch (error) {
            lMes.statusErr=false;
            lMes.errMes=`Error: ${error.parent.message}`;
        }
    }
    res.send(lMes);
}

module.exports.VitriChiDelete = async (req, res ) => {
    let lMes={}
    const {ViTriChi} = req.body
    try {
        await db.query(`wacoal_VITRICHIITEM_Delete_Web_V1 @VITRICHI=:VITRICHI`,{
            replacements:{VITRICHI:ViTriChi}
        }).then(result => {
            lMes.statusErr=true;
            lMes.errMes="Xóa thành công";
        })
        
    } catch (error) {
        lMes.statusErr=false;
        lMes.errMes=`Error: ${error.parent.message}`;
    }
    res.send(lMes)
}