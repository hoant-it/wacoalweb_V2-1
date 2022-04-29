const db =require ('../../databases/database').sequelize;


module.exports.CongThucTinhChiLoad= async (req, res) => {
    res.render('kho/CongThucTinhChi',{
        title: 'Wacoal Website- Công Thức Tính Chỉ',
        userId: req.signedCookies.userId,
        html: '',
    })
}


module.exports.CongThuCTinhchiUpdate = async(req, res) => {
    console.log(req.body);
    const{LoaiMay,VitriChi,CongThucTinhChi,status} =req.body;
    let lMes={};
    if(status==="submitInsert"){
        try {
            await db.query(`wacoal_CONGTHUCTINHCHIITEM_Insert_Web_V1 
            @LOAIMAY=:LOAIMAY,
            @VITRICHI=:VITRICHI,
            @CONTHUCTINHCHI=:CONTHUCTINHCHI,
            @UserName=:UserName`,{
                replacements:{
                    LOAIMAY:LoaiMay,
                    VITRICHI:VitriChi,
                    CONTHUCTINHCHI:CongThucTinhChi,
                    UserName:req.signedCookies.userId
                }
            }).then(result => {
            console.log(result);
            lMes.statusErr=true;
            lMes.errMes="Cập Nhật Thành Công"
            })
        } catch (error) {
            lMes.statusErr=false;
            lMes.errMes=`Error: ${error.parent.message}`
            
        }

    }
    if(status==="submitEdit"){
        try {
            await db.query(`wacoal_CONGTHUCTINHCHIITEM_Update_Web_V1 
            @LOAIMAY=:LOAIMAY,
            @VITRICHI=:VITRICHI,
            @CONTHUCTINHCHI=:CONTHUCTINHCHI,
            @UserName=:UserName`,{
                replacements:{
                    LOAIMAY:LoaiMay,
                    VITRICHI:VitriChi,
                    CONTHUCTINHCHI:CongThucTinhChi,
                    UserName:req.signedCookies.userId
                }
            }).then(result => {
            console.log(result);
            lMes.statusErr=true;
            lMes.errMes="Cập Nhật Thành Công"
            })
        } catch (error) {
            lMes.statusErr=false;
            lMes.errMes=`Error: ${error.parent.message}`
            
        }

    }

    res.send(lMes);


}

module.exports.CongThucTinhChiDelete=  async (req, res) => {
    console.log(req.body)
    const{LoaiMay,VitriChi}=req.body;
    let lMes={};
    try {
        await db.query(`wacoal_CONGTHUCTINHCHIITEM_Delete_Web_V1 
        @LOAIMAY=:LOAIMAY,
        @VITRICHI=:VITRICHI`,{
            replacements: { LOAIMAY:LoaiMay,
                VITRICHI:VitriChi
            }
        }).then(result => {
            console.log(result);
            lMes.statusErr=true;
            lMes.errMes="Xóa Thành Công"
        })
        
    } catch (error) {
        lMes.statusErr=false;
        lMes.errMes=`Error: ${error.parent.message}`
        
    }
    res.send(lMes)
}