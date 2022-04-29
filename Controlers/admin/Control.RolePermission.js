const db= require('../../databases/database').sequelize;
module.exports.RolePermissionLoad= async (req, res) =>{
    var arrListUserGroup=[];
    console.log(req.body);
    await db.query('wacoal_ListUserGroup_Load_Web_V1',{
  
    }).then(result => {
      arrListUserGroup=result[0];
      // console.log(arrListUserGroup)
    }).catch(err => {
      console.log(err.message);
    })
    // console.log(message);
  res.render('admin/rolePermission',{
    title:'treelist test',
    userId:req.signedCookies.userId,
    html:'',
    arrListUserGroup:arrListUserGroup
  })
}
module.exports.RolePermissionmoveRuleInRole= async (req, res) =>{
    const{PermisionGroupCode,RoleId}=req.body;
    var send={};
    try {
        await db.query(`wacoal_AuthorizationOnUserGroup_InsertRuleInRole_web_V1 
        @GroupUserCode=:GroupUserCode,
        @PermisionGroupCode=:PermisionGroupCode`,{
        replacements:{GroupUserCode:RoleId,PermisionGroupCode:PermisionGroupCode}
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

module.exports.RolePermissiondeleteRuleInRole= async (req, res) =>{
    const{PermisionGroupCode,RoleId}=req.body;
    var send={};
    try {
        await db.query(`wacoal_AuthorizationOnUserGroup_DeleteRuleInRole_web_V1 
        @GroupUserCode=:GroupUserCode,
        @PermisionGroupCode=:PermisionGroupCode`,{
        replacements:{GroupUserCode:RoleId,PermisionGroupCode:PermisionGroupCode}
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

module.exports.RolePermissionMoveUserInrRole= async (req, res) =>{
    const{UserId,RoleId}=req.body;
    var send={};
    try {
        await db.query(`wacoal_Role_InsertUser_Web_V1 
        @GroupUserCode=:GroupUserCode,
        @UserID=:UserID`,{
        replacements:{GroupUserCode:RoleId,UserID:UserId}
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

module.exports.RolePermissionDeleteUserInRole= async (req, res) =>{
    const{UserId,RoleId}=req.body;
    var send={};
    try {
        await db.query(`wacoal_Role_DeleteUser_Web_V1 
        @GroupUserCode=:GroupUserCode,
        @UserID=:UserID`,{
        replacements:{GroupUserCode:RoleId,UserID:UserId}
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

module.exports.RolePermissionUpdateRole= async (req, res) =>{
    const{RoleId,RoleName,Status}=req.body;
    var send={};
    try {
      if(Status==='submitInsert'){
        await db.query(`wacoal_ListUserGroup_Insert_Web_V1 
        @GroupUserCode=:GroupUserCode,
        @GroupUserDescription=:GroupUserDescription`,{
          replacements:{GroupUserCode:RoleId,GroupUserDescription:RoleName}
        }).then(result => {
          send.mes='ok';
  
        }).catch(err => {
          send.mes= 'Err: ' + err.parent.message;
  
        });
      }
      if(Status==='submitUpdate'){
        await db.query(`wacoal_ListUserGroup_Update_Web_V1 
        @GroupUserCode=:GroupUserCode,
        @GroupUserDescription=:GroupUserDescription`,{
          replacements:{GroupUserCode:RoleId,GroupUserDescription:RoleName}
        }).then(result => {
          send.mes='ok';
  
        }).catch(err => {
          send.mes= 'Err: ' + err.parent.message;
  
        });
  
      }
      
    } catch (error) {
      send.mes=('Err: ',error.parent.message);
    }
    res.send(send);
}

module.exports.RolePermissionDeleteRule= async (req, res) =>{
    const{RoleId}=req.body;
    var send={};
    try {
        await db.query('Role_Delete_Web_V1 @GroupUserCode=:GroupUserCode',{
        replacements:{GroupUserCode:RoleId}
        }).then(result => {
        send.mes='ok';
        }).catch(err => {
        send.mes= 'Err: ' + err.parent.message;
        });
    } catch (error) {
        send.mes= 'Err: ' + err.parent.message;
    }
    res.send(send);
}