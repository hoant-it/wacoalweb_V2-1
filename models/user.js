const Sequelize= require('sequelize');
const sequelize= require('../databases/database').sequelize;
const Op=require('../databases/database').Op;
const ListUser=sequelize.define('ListUser',{
    UserID:{
        type:Sequelize.BIGINT,
        primaryKey:true
    },
    UserName:{
        type:Sequelize.STRING,
    },
    Email:{
        type:Sequelize.STRING,
    },
    WebPass:{
        type:Sequelize.STRING,
    }
    
}
,
{
    timestamps:false,
    tableName:'ListUser'
}
);

module.exports=ListUser
