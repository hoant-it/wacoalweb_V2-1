const db= require('../../databases/database').sequelize;
module.exports.MenuListLoad= async (req, res) =>{
    var arrListMenu=[];
    var Menucode='';
    await db.query('sp_CNY_Menu_CreateMenuCode',{
    }).then(result => {
        Menucode=result[0][0].MenuCode;
    })
    // console.log(arrMenucode);
    await db.query("wacoal_ListMenu_Load_website_v1",{
    
    }).then(result => {
        arrListMenu=result[0];
    //   console.log(arrListMenu);
    })
        res.render("admin/ListMenu", {
        title:'Express',
        userId:req.signedCookies.userId,
        html:'',
        arrListMenu:arrListMenu,
        Menucode:Menucode
        });

}

module.exports.MenuListUpdate= async (req,res) => {
    var mes='';
  const {MenuCode,FormName,FormCode,ProjectCode,ShowCode,SystemName,Status}=req.body;

  if(Status === "submitInsert"){
      console.log('dang o day');
    try {
        await   db.query(`wacoal_ListMenu_Insert_Wesite_v1 
        @MenuCode=:MenuCode, 
        @FormName=:FormName, 
        @FormCode=:FormCode, 
        @ProjectCode=:ProjectCode,
        @ShowCode=:ShowCode,
        @SystemName=:SystemName
        `,{ replacements:{
            MenuCode:MenuCode,
            FormName:FormName,
            FormCode:FormCode,
            ProjectCode:ProjectCode,
            ShowCode:ShowCode,
            SystemName:SystemName
          }}).then(result => {
          console.log(result);
          mes = 'ok';
          }).catch(err => {
          mes = ('Error:', err);
          })
      
        } catch (error) {
      mes = ('Error: ',error.parent.message);
    }
  }
  if(Status === "submitEdit"){
   try {
     await db.query(`wacoal_ListMenu_Update_Web_V1 
     @MenuCode=:MenuCode,
     @FormName=:FormName,
     @FormCode=:FormCode,
     @ProjectCode=:ProjectCode,
     @ShowCode=:ShowCode,
     @SystemName=:SystemName
     `,{replacements: {
      MenuCode:MenuCode,
      FormName:FormName,
      FormCode:FormCode,
      ProjectCode:ProjectCode,
      ShowCode: ShowCode,
      SystemName:SystemName
     }}).then(resulf =>{
       mes='ok';
     }).catch(err => {
       mes= ('Error', err);
     })
     
   } catch (error) {
    mes= ('Error', error.parent.message);
   }
  }

  res.send(mes);
}

module.exports.MenuListDelete= async (req, res ) => {
    const{Name}=req.body;
    var send={};
    try {
        await db.query('wacoal_ListMenu_Delete_WebSite_v1 @MenuCode=:MenuCode',{
        replacements:{MenuCode:Name}
        }).then(result => {
        send.mes='ok';
        }).catch(err =>{
        send.mes= "Err" + mes.message;
        })
        
    } catch (error) {

        send.mes= "Err" + error.parent.message;
    }
    console.log('send' +send.mes );
    res.send(send);
}