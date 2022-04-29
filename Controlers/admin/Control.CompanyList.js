const db= require('../../databases/database').sequelize;

module.exports.CompanyListLoad= async (req, res) =>{
    var arrListCompany=[];
  try {
    await db.query("ListCompany_Load_Web_V1",{

    }).then(result => {
      arrListCompany=result[0];
      // console.log(arrListCompany);
    }).catch(err => {
      console.log(err);
    });

      res.render("admin/CompanyList", {
        title:'Express',
        userId:req.signedCookies.userId,
        html:'',
        arrListCompany:arrListCompany
  
      });
  } catch (error) {
    console.log(error.parent.message);
  }
}

module.exports.CompanyPostUpdate= async (req, res ) => {
    var mes='';
  const {CompanyCode,CompanyName,Adrress,PhoneNumber,Fax,PersonRepresent,Positions,BankName,BankAddress,BankAccount,MaSoThue,Tax,Email,Status}=req.body;

  if(Status === "submitInsert"){
    try {
        await   db.query(`ListCompany_Insert_Web_V1 
        @CompanyCode=:CompanyCode, 
        @CompanyName=:CompanyName, 
        @Adrress=:Adrress,
        @PhoneNumber=:PhoneNumber,
        @Fax=:Fax,
        @PersonRepresent=:PersonRepresent,
        @Positions=:Positions,
        @BankName=:BankName,
        @BankAddress=:BankAddress,
        @BankAccount=:BankAccount,
        @MaSoThue=:MaSoThue,
        @Tax=:Tax,
        @Email=:Email
        `,{ replacements:{
          CompanyCode:CompanyCode,
          CompanyName:CompanyName,
          Adrress:Adrress,
          PhoneNumber:PhoneNumber,
          Fax:Fax,
          PersonRepresent:PersonRepresent,
          Positions:Positions,
          BankName:BankName,
          BankAddress:BankAddress,
          BankAccount:BankAccount,
          MaSoThue:MaSoThue,
          Tax:Tax,
          Email:Email
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
      await   db.query(`ListCompany_Update_Web_V1 
      @CompanyCode=:CompanyCode, 
      @CompanyName=:CompanyName, 
      @Adrress=:Adrress,
      @PhoneNumber=:PhoneNumber,
      @Fax=:Fax,
      @PersonRepresent=:PersonRepresent,
      @Positions=:Positions,
      @BankName=:BankName,
      @BankAddress=:BankAddress,
      @BankAccount=:BankAccount,
      @MaSoThue=:MaSoThue,
      @Tax=:Tax,
      @Email=:Email
      `,{ replacements:{
        CompanyCode:CompanyCode,
        CompanyName:CompanyName,
        Adrress:Adrress,
        PhoneNumber:PhoneNumber,
        Fax:Fax,
        PersonRepresent:PersonRepresent,
        Positions:Positions,
        BankName:BankName,
        BankAddress:BankAddress,
        BankAccount:BankAccount,
        MaSoThue:MaSoThue,
        Tax:Tax,
        Email:Email
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

module.exports.CompanyListPostDelete = async(req,res) => {
    const{CompanyCode}=req.body;
    var send={};
    try {
      await db.query('ListCompany_Delete_Web_V1 @CompanyCode=:CompanyCode',{
        replacements:{CompanyCode:CompanyCode}
      
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