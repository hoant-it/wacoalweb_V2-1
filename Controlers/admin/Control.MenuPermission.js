const db= require('../../databases/database').sequelize;
module.exports.MenuPermissionLoad= async (req, res) =>{
    var arrPermisionGroupCode=[];
    console.log(req.body);
    await db.query('wacoal_PermisionGroupCode_load_Web_v1',{
  
    }).then(result => {
      arrPermisionGroupCode=result[0];
      // console.log(arrPermisionGroupCode)
    }).catch(err => {
      console.log(err.message);
    })
    // console.log(message);
  res.render('admin/menuPermission',{
    title:'treelist test',
    userId:req.signedCookies.userId,
    html:'',
    arrPermisionGroupCode:arrPermisionGroupCode
  })
}

module.exports.MenuPermissionUpdate= async (req,res) => {
    // console.log(req.body);
  var send={};
  try {
    const {SourceDataTask_ID,TargetDataTask_ID,TargetHas_Items,DropInsideItem,Rulecode,Status}=req.body;
    if( Status=== ''){
      send.reload=false;
      if(DropInsideItem){
        if(TargetHas_Items){
          await db.query('wacoal_MenuInPermision_dropInsideItem_v2  @MenuCode=:MenuCode, @MenuParent=:MenuParent, @PermisionGroupCode=:PermisionGroupCode',{
            replacements:{MenuCode:SourceDataTask_ID, MenuParent:TargetDataTask_ID,PermisionGroupCode:Rulecode}
          }).then(result => {
            send.mes='ok';
        
          }).catch(err =>{
            send.mes=('Err: ', err);
          })
    
        }else {
          send.mes='Err: khong the di chuyen vao nut la';
        }
      } else{
        console.log('SourceDataTask_ID ' +SourceDataTask_ID + '  ' + TargetDataTask_ID);
        await db.query(`wacoal_MenuInPermision_dropOutsideItem_web_v2 
        @sourceMenuCode=:sourceMenuCode, 
        @targetMenuCode=:targetMenuCode, 
        @PermisionGroupCode=:PermisionGroupCode`,{
          replacements:{sourceMenuCode:SourceDataTask_ID,targetMenuCode:TargetDataTask_ID,PermisionGroupCode:Rulecode}
        }).then(result => {
          send.mes='ok';
        }).catch(err => {
          // console.log(err);
          send.mes=('Err: ', err.message);
        });
      }
    }
     //move menupermission from menu inside
    if(Status === 'submitMoveInside'){
      send.reload=true;
      if(TargetHas_Items){
        await db.query(`wacoal_MenuInPermision_dropInsideItem_fromGrid_web_v1  
        @MenuCode=:MenuCode, 
        @MenuParent=:MenuParent, 
        @PermisionGroupCode=:PermisionGroupCode`,{
          replacements:{MenuCode:SourceDataTask_ID, MenuParent:TargetDataTask_ID,PermisionGroupCode:Rulecode}
        }).then(result => {
          send.mes='ok';
      
        }).catch(err =>{
          send.mes=('Err: ', err);
        })
      }else {
        send.mes='Err: khong the di chuyen vao nut la';
      }
    }
    //move menupermission from menu out side
    if(Status==='submitMoveOutSide'){
      send.reload=true;
      // console.log('SourceDataTask_ID ' +SourceDataTask_ID + '  ' + TargetDataTask_ID);
        await db.query(`wacoal_MenuInPermision_dropOutsideItem_fromGrid_web_v2 
        @sourceMenuCode=:sourceMenuCode, 
        @targetMenuCode=:targetMenuCode, 
        @PermisionGroupCode=:PermisionGroupCode`,{
          replacements:{sourceMenuCode:SourceDataTask_ID,targetMenuCode:TargetDataTask_ID,PermisionGroupCode:Rulecode}
        }).then(result => {
          send.mes='ok';
        }).catch(err => {
          // console.log(err);
          send.mes=('Err: ', err.message);
        });
    }
  //delete menupermission
    if(Status === 'submitDelete'){
      send.reload=true;
      await db.query(`wacoal_MenuInPermision_Delete_web_v1 
      @MenuCode=:MenuCode, 
      @PermisionGroupCode=:PermisionGroupCode`,{
        replacements:{MenuCode:TargetDataTask_ID,PermisionGroupCode:Rulecode }
      }).then(result =>{
        send.mes='ok';
      }).catch(err => {
        send.mes=('Err: ', err);
      })
    }
    
  } catch (error) {
    send.mes=('Err: ', error.parent.message);
  }
  // console.log(mes);
	res.send(send);

}

module.exports.MenupermissionUpdateRule= async (req,res) => {
    var send={};
  const{RuleCode,RuleName,Status}=req.body;
  try {
    if(Status === 'submitInsert'){
      await db.query(`ListPermisionGroup_Insert_Web_V1 
      @PermisionGroupCode=:PermisionGroupCode, 
      @PermisionGroupDescription=:PermisionGroupDescription`,{
        replacements:{PermisionGroupCode:RuleCode, PermisionGroupDescription:RuleName}
      }).then(result => {
        send.mes='ok';
      }).catch(err => {
        send.mes=('Error', err.parent.message);
      })
    }
    if(Status === 'submitUpdate'){
      await db.query(`wacoal_ListPermisionGroup_Update 
      @PermisionGroupCode=:PermisionGroupCode, 
      @PermisionGroupDescription=:PermisionGroupDescription`,{
        replacements:{PermisionGroupCode:RuleCode, PermisionGroupDescription:RuleName}
      }).then(result => {
        send.mes='ok';
      }).catch(err => {
        send.mes=('Error', err.parent.message);
      })
    }
    
  } catch (error) {
    send.mes=('Error', error.parent.message);
  }
  res.send(send);

}

module.exports.MenupermissionDeleteRule= async (req,res) => {
    const{RuleCode}=req.body
    var send={};
    try {
        await db.query('wacoal_ListPermisionGroup_Delete_Web_V1 @PermisionGroupCode=:PermisionGroupCode',{
        replacements:{PermisionGroupCode:RuleCode}
        }).then(result => {
        send.mes='ok';
        }).catch(err => {
        send.mes=('Error', err.parent.message);
        })
    } catch (error) {
        send.mes=('Error', error.parent.message);
    }
    res.send(send)

}


