

// dung server HRM-APP

const Sequelize=require('sequelize');

// console.log(process.env.DB_Name);

const sequelize=new Sequelize(
    process.env.DB_Name,
    process.env.DB_UserName,
    process.env.DB_PW,
    {
        dialect: process.env.DB_Dialect,
        host:process.env.DB_Host,
        operatorsAliases:0,
        dialectOptions:{
            options:{
                validateBulkLoadParameters: true,
            }

        },
   
        pool:{
            max:5,
            min:0,
            require:30000,
            idle:10000
        }
    }
);
const Op=Sequelize.Op;
module.exports={
    sequelize,
    Op

}

//DUNG SERVER LOCAL

// const Sequelize=require('sequelize');
// const sequelize=new Sequelize(
//     'wacoal',//db name
//     'sa',//username
//     'sa',
//     {
//         dialect:'mssql',
//         host:'localhost',
//         operatorsAliases:0,
//         dialectOptions:{
//             options:{
//                 validateBulkLoadParameters: true,
//             }

//         },
   
//         pool:{
//             max:5,
//             min:0,
//             require:30000,
//             idle:10000
//         }
//     }
// );
// const Op=Sequelize.Op;
// module.exports={
//     sequelize,
//     Op

// }