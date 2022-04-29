
const db = require('../../databases/database').sequelize;

module.exports.KhachHangLoad= (req, res) => {
    res.render("kho/khachhang", {
        title: 'Khach Hang',
        userId: req.signedCookies.userId,
        html: '',
    });
}

module.exports.UpdateKhachHang= async(req, res ) =>{
    const{KhachHang,KhachHangNameVN,status}=req.body;
    let lMes={};
    // statusErr,errMes
    if(status==='submitInsert'){
        try {
            await db.query(`wacoal_KHACHHANG_Insert_Web_V1 
            @MAKH=:MAKH, 
            @TENKH_VN=:TENKH_VN,
            @UserName=:UserName`,{
                replacements:{MAKH:KhachHang,
                    TENKH_VN:KhachHangNameVN,
                    UserName:req.signedCookies.userId
                }
            }).then(result =>{
                lMes.statusErr=true;
                lMes.errMes="Cập nhật thành công";
            })
            
        } catch (error) {
            lMes.statusErr=false;
            lMes.errMes=`Lỗi: ${error.parent.message}`;
        }

    }
    if(status=="submitEdit"){
        try {
            await db.query(`wacoal_KHACHHANG_Update_Web_V1 
            @MAKH=:MAKH, 
            @TENKH_VN=:TENKH_VN,
            @UserName=:UserName`,{
                replacements:{MAKH:KhachHang,
                    TENKH_VN:KhachHangNameVN,
                    UserName:req.signedCookies.userId
                }
            }).then(result =>{
                lMes.statusErr=true;
                lMes.errMes="Cập nhật thành công";
            })
            
        } catch (error) {
            lMes.statusErr=false;
            lMes.errMes=`Lỗi: ${error.parent.message}`;
        }

    }

    res.send(lMes);

}

module.exports.KhachHangDelete= async ( req, res ) =>{
    const{KhachHang}=req.body;
    let lMes={};
    try {
        await db.query(`wacoal_KhachHang_Delete_Web_V1 
        @MAKH=:MAKH`,{
            replacements:{MAKH:KhachHang
            }
        }).then(result =>{
            lMes.statusErr=true;
            lMes.errMes="Xóa thành công";
        })
        
    } catch (error) {
        lMes.statusErr=false;
        lMes.errMes=`Lỗi: ${error.parent.message}`;
    }

    res.send(lMes);

}