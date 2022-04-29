const db =require('../../databases/database').sequelize;


module.exports.LoaiChiLoad= (req, res) => {
    res.render("kho/LoaiChi", {
        title: 'LoaiChi_Wacoal',
        userId: req.signedCookies.userId,
        html: '',
    });
}

module.exports.LoaiChiUpdate =  async(req, res) => {
    // console.log(req.body);
    var lMes={};
    const { LoaiChi, LoaiChiNameVN, LoaiChiNameEN, status } = req.body;
    // alert('aaa');
    // res.send('ok');
    // console.log(req.body);
    if (status === "submitEdit") {
        try {
            await db.query(`wacoal_LOAICHIITEM_Update_V1
        @LOAICHICODE=:LOAICHICODE,
        @LOAICHINAME_VN=:LOAICHINAME_VN,
        @LOAICHINAME_EN=:LOAICHINAME_EN,
        @UserName=:UserName
   `, {
                replacements: {
                    LOAICHICODE: LoaiChi,
                    LOAICHINAME_VN: LoaiChiNameVN,
                    LOAICHINAME_EN: LoaiChiNameEN,
                    UserName: req.signedCookies.userId
                }
            }).then(result => {
                console.log(result);
                lMes.statusErr=true;
                lMes.errMes="Cập Nhật thành công"
               
            })
            .catch(err => {
                lMes.statusErr=false;
                lMes.errMes=`Err:  ${err.parent.message}`;
            })
            
        } catch (error) {
            lMes.statusErr=false;
            lMes.errMes=`Err:  ${error.parent.message}`;
        }
    }
    if (status === 'submitInsert') {
        try {
            await db.query(`wacoal_LOAICHIITEM_Insert_V1 
    @LOAICHICODE=:LOAICHICODE,
    @LOAICHINAME_VN=:LOAICHINAME_VN,
    @LOAICHINAME_EN=:LOAICHINAME_EN,
    @UserName=:UserName
    `, {
        replacements: {
            LOAICHICODE: LoaiChi,
            LOAICHINAME_VN: LoaiChiNameVN,
            LOAICHINAME_EN: LoaiChiNameEN,
            UserName: req.signedCookies.userId
        }
            }).then(result => {
                console.log(result);
                lMes.statusErr=true;
                lMes.errMes="Cập Nhật thành công"
            })
            .catch(err => {
                lMes.statusErr=false;
                lMes.errMes=`Err:  ${err.parent.message}`;
            })
            
        } catch (error) {
            lMes.statusErr=false;
            lMes.errMes=`Err:  ${error.parent.message}`;
        }
    }
    // console.log(lMes);
    res.send(lMes);
}


module.exports.LoaiChiDelete = async (req, res ) => {
    var lMes={};
    const{Loaichi}=req.body;
    try {
        await db.query('wacoal_LOAICHIITEM_Delete_V1 @LOAICHICODE=:LOAICHICODE', {
            replacements: {
                LOAICHICODE: Loaichi
            }
        }).then(resulft => {
            console.log(resulft);
            lMes.statusErr=true;
            lMes.errMes="Xóa thành công"
        })
        .catch(err => {
            lMes.statusErr=false;
            lMes.errMes=`Err:  ${err.parent.message}`;
        })
        
    } catch (error) {
        lMes.statusErr=false;
        lMes.errMes=`Err:  ${error.parent.message}`;
        
    }
    
res.send(lMes);
}