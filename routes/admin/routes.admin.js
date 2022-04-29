const express = require('express');
const router = express.Router();
const ControlCompanyList= require('../../Controlers/admin/Control.CompanyList');
const ControlDepartmentList= require('../../Controlers/admin/Control.ListDepartment');
const ControlMenuList=require('../../Controlers/admin/Control.MenuList');
const ControlMenuPermission=require('../../Controlers/admin/Control.MenuPermission');
const ControlPoisitionList=require('../../Controlers/admin/Control.PoisitionList');
const ControlRolePermission= require('../../Controlers/admin/Control.RolePermission');
const ControlUserList= require('../../Controlers/admin/Control.UserList');
//Company
router.get('/company',ControlCompanyList.CompanyListLoad);
router.post('/company',ControlCompanyList.CompanyPostUpdate);
router.post('/company/DeleteCompany',ControlCompanyList.CompanyListPostDelete);
//ListDepartment
router.get('/department',ControlDepartmentList.ListDeparmentLoad);
router.post('/department',ControlDepartmentList.ListDepartmentPostUpdate);
router.post('/department/DeleteDepartment',ControlDepartmentList.ListDepartmentDelete);
//MenuList
router.get('/listmenu',ControlMenuList.MenuListLoad);
router.post('/listmenu',ControlMenuList.MenuListUpdate);
router.post('/listmenu/DeleteMenu',ControlMenuList.MenuListDelete);
//Menupermission
router.get('/menuPermission',ControlMenuPermission.MenuPermissionLoad);
router.post('/menuPermission',ControlMenuPermission.MenuPermissionUpdate);
router.post('/menuPermission/updateRule',ControlMenuPermission.MenupermissionUpdateRule);
router.post('/menuPermission/deleteRule',ControlMenuPermission.MenupermissionDeleteRule);
//PoisitionList
router.get('/positionlist',ControlPoisitionList.PositionListLoad);
router.post('/positionlist',ControlPoisitionList.PositionListUpdate);
router.post('/positionlist/Deletepositionlist',ControlPoisitionList.PositionListDelete);
//RolePermission
router.get('/rolePermission',ControlRolePermission.RolePermissionLoad);
router.post('/rolePermission/moveRuleInRole',ControlRolePermission.RolePermissionmoveRuleInRole);
router.post('/rolePermission/deleteRuleInRole',ControlRolePermission.RolePermissiondeleteRuleInRole);
router.post('/rolePermission/moveUserInrRole',ControlRolePermission.RolePermissionMoveUserInrRole);
router.post('/rolePermission/deleteUserInRole',ControlRolePermission.RolePermissionDeleteUserInRole);
router.post('/rolePermission/updateRole',ControlRolePermission.RolePermissionUpdateRole);
router.post('/rolePermission/deleteRule',ControlRolePermission.RolePermissionDeleteRule);
//UserList
router.get('/userlistv2',ControlUserList.UserListLoad);
router.post('/userListV2',ControlUserList.UserListUpdate);
module.exports = router;