const db= require('../../databases/database').sequelize;
module.exports.PositionListLoad= async (req, res) =>{
    var arrListPositions=[];
    var PositionsCodeSTRNext='';
    try {
        await db.query("ListPositions_Load_Web_V1",{

        }).then(result => {
        arrListPositions=result[0];
        // console.log(arrListPositions);
        }).catch(err => {
        console.log(err);
        });

        await db.query("ListPositions_PositionsCodeGetNext",{

        }).then(result => {
            // console.log(result[0]);
            PositionsCodeSTRNext=result[0][0].PositionsCodeSTRNext;
        //   console.log(PositionsCodeSTRNext);
        }).catch(err => {
        console.log(err);
        });

        res.render("admin/PoisitionList", {
            title:'Express',
            userId:req.signedCookies.userId,
            html:'',
            arrListPositions:arrListPositions,
            PositionsCodeSTRNext:PositionsCodeSTRNext
        });
        
    } catch (error) {
        console.log(error.parent.message);
    }
}

module.exports.PositionListUpdate= async (req, res) =>{
    var mes='';
    const {PositionsCode,PositionsName,PositionsDescription,Status}=req.body;

    if(Status === "submitInsert"){
        try {
            await   db.query(`ListPositions_Insert_Web_V1 
            @PositionsCode=:PositionsCode, 
            @PositionsName=:PositionsName, 
            @PositionsDescription=:PositionsDescription
            `,{ replacements:{
                PositionsCode:PositionsCode,
                PositionsName:PositionsName,
                PositionsDescription:PositionsDescription
            }}).then(result => {
            console.log(result);
            mes = 'ok';
            }).catch(err => {
            mes = ('Error:', err.parent.message);
            })
        
            } catch (error) {
        mes = ('Error: ',error.parent.message);
        }
    }
    if(Status === "submitEdit"){
        try {
            await   db.query(`ListPositions_Update_Web_V1 
            @PositionsCode=:PositionsCode, 
            @PositionsName=:PositionsName, 
            @PositionsDescription=:PositionsDescription
            `,{ replacements:{
                PositionsCode:PositionsCode,
                PositionsName:PositionsName,
                PositionsDescription:PositionsDescription
            }}).then(result => {
            console.log(result);
            mes = 'ok';
            }).catch(err => {
            mes = ('Error:', err.parent.message);
            })
        
            } catch (error) {
        mes = ('Error: ',error.parent.message);
        }
    }
    res.send(mes);
}

module.exports.PositionListDelete= async (req, res) =>{
    const{PositionsCode}=req.body;
    var send={};
    try {
    await db.query('ListPositions_Delete_Web_V1 @PositionsCode=:PositionsCode',{
        replacements:{PositionsCode:PositionsCode}
    
    }).then(result =>{
        send.mes='ok'
    }).catch( err => {
        send.mes = ('Error:', err.parent.message);
    })
    
    } catch (error) {
    send.mes= ('Error', err.parent.message);
    }

    res.send(send)
}