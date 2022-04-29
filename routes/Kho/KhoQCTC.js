var express = require('express');
const db= require('../../databases/database').sequelize;
var router = express.Router();

var arrOrder=[];
var arrNamSelect=[
    {values:"",name:''},
    {values:"2020",name:'2020'},
    {values:"2021",name:'2021'},
]
var _selectNam='';

var arrThangSelect=[
    {values:"",name:''},
    {values:"1",name:'1'},
    {values:"2",name:'2'},
    {values:"3",name:'3'},
    {values:"4",name:'4'},
    {values:"5",name:'5'},
    {values:"6",name:'6'},
    {values:"7",name:'7'},
    {values:"8",name:'8'},
    {values:"9",name:'9'},
    {values:"10",name:'10'},
    {values:"11",name:'11'},
    {values:"12",name:'12'},
]
var _selectThang='';

router.get('/', async(req,res) =>{
    // console.log(arrNamSelect);
res.render('kho/QCTC',{
    title:'Express',
    userId:req.signedCookies.userId,
    html:'',
    arrOrder:arrOrder,
    arrNamSelect:arrNamSelect,
    selectNam:_selectNam,
    arrThangSelect:arrThangSelect,
    _selectThang:_selectThang
})
})

router.post('/',async(req, res ) => {
    try {
        const {bsubmit,selectNam,selectThang,selectKH,selectMH}= req.body;
        console.log(req.body);
        if(bsubmit==="submitSearch"){
            await db.query('wacoal_Load_Chi_V1 @ORDERYEAR=:ORDERYEAR , @ORDERMONTH=:ORDERMONTH, @DIVISIONCODE=:DIVISIONCODE,@PRODUCTCODE=:PRODUCTCODE  ',{
                replacements: { ORDERYEAR:  selectNam, ORDERMONTH:selectThang, DIVISIONCODE:selectKH,PRODUCTCODE:selectMH},
            }).then(result =>{
                arrOrder=result[0];
            });
            _selectNam=selectNam;
            console.log(_selectNam);
            _selectThang=selectThang;
            res.redirect('/home/kho/QCTC');
            // res.render('kho/QCTC',{
            //     title:'Express',
            //     userId:req.signedCookies.userId,
            //     html:req.signedCookies.html,
            //     arrOrder:arrOrder,
            //     arrNamSelect:arrNamSelect,
            //     selectNam:_selectNam,
            //     arrThangSelect:arrThangSelect,
            //     _selectThang:_selectThang
            // })
            // console.log(arrOrder);
        //   console.log("dang search ne");
        //   console.log(req.body);
        }else{
          console.log("dang cancel ne")
        }
        
    } catch (error) {
        
    }
  
}) 




module.exports = router;