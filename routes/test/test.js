var express = require('express');
var router = express.Router();
const db= require('../../databases/database').sequelize;
// const importExcel=require('convert-excel-to-json');
const xlsx= require('xlsx');
const del=require('del');


router.get('/', async (req,res) => {
    res.render('test',{
    
    })
    });

    router.get('/QRCodeScan', async (req,res) => {
        res.render('QRCodeScan',{
        
        })
        });


module.exports = router;
