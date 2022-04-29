const db= require('../../databases/database').sequelize;


module.exports.ListDeparmentLoad = async(req,res) => {
    var ListDepartment=[];
    var arrListCompany_Load_Web_V1=[];
    try {
        await db.query("ListDepartment_Load_Web_V1",{

        }).then(result => {
        ListDepartment=result[0];
        // console.log(ListDepartment);
        }).catch(err => {
        console.log(err);
        });

        await db.query("ListCompany_Load_Web_V1",{

        }).then(result => {
        arrListCompany_Load_Web_V1=result[0];
        // console.log(ListDepartment);
        }).catch(err => {
        console.log(err);
        });

        res.render("admin/ListDeparment", {
            title:'Express',
            userId:req.signedCookies.userId,
            html:'',
            ListDepartment:ListDepartment,
            arrListCompany_Load_Web_V1:arrListCompany_Load_Web_V1
        });
        
    } catch (error) {
        console.log(error.parent.message);
    }
}

module.exports.ListDepartmentPostUpdate= async (req,res) => {

    var mes='';
    const {DepartmentCode,DepartmentName,CompanyCode,Status}=req.body;
    if(Status === "submitInsert"){
        try {
        if(DepartmentCode===""){
            mes = ('Error: Không được để trống DepartmentCode');
        } else{
            await   db.query(`ListDepartment_Insert_Web_V1 
            @DepartmentCode=:DepartmentCode, 
            @DepartmentName=:DepartmentName, 
            @CompanyCode=:CompanyCode
            `,{ replacements:{
            DepartmentCode:DepartmentCode,
            DepartmentName:DepartmentName,
            CompanyCode:CompanyCode
            }}).then(result => {
            console.log(result);
            mes = 'ok';
            }).catch(err => {
            mes = ('Error:', err.parent.message);
            })
        }
            } catch (error) {
        mes = ('Error: ',error.parent.message);
        }
    }
    if(Status === "submitEdit"){
    try {
        await   db.query(`ListDepartment_Update_Web_V1 
        @DepartmentCode=:DepartmentCode, 
        @DepartmentName=:DepartmentName, 
        @CompanyCode=:CompanyCode
        `,{ replacements:{
        DepartmentCode:DepartmentCode,
        DepartmentName:DepartmentName,
        CompanyCode:CompanyCode
        }}).then(result => {
        console.log(result);
        mes = 'ok';
        }).catch(err => {
        mes = ('Error:', err.parent.message);
        })
        
    } catch (error) {
        mes= ('Error', err.parent.message);
    }
    }

  res.send(mes);
}

module.exports.ListDepartmentDelete= async (req, res) => {
    const{DepartmentCode}=req.body;
    var send={};
    try {
      await db.query('ListDepartment_Delete_Web_V1 @DepartmentCode=:DepartmentCode',{
        replacements:{DepartmentCode:DepartmentCode}
      
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