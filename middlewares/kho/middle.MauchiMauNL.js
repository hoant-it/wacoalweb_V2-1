
module.exports.MauChiMauNLUpdateMiddle= async(req,res,next) => {
    let lError={}
    const {mauNL}= req.body;
    if(mauNL===''){
        lError.errMes=('Error: Màu NL không được để trống');
        lError.statusErr=false;
        return res.send(lError);
    }else{
        next();
    }
}