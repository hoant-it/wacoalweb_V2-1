// console.log(process.env);
 const dotenv= require('dotenv');
 dotenv.config();
//  console.log(process.env.DB_Host);
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
// const upload=require('express-fileupload');
const bodyParser= require ('body-parser');



// var childHref=  window.location.href.substr(window.location.href.lastIndexOf("/")+1,window.location.href.length);

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const homeRouter=require('./routes/home/home');
const testRouter=require('./routes/test/test');
const loginRouter=require('./routes/login');
const logoutRouter= require('./routes/logout');
const changePasswordRouter= require('./routes/changePassword');
const changePasswordFirstRouter= require('./routes/ChangePasswordFist');
const QRCodeScanRouter=require('./routes/QRCodeScan');



//VietNam Wacoal
// const VNWCSDTCCRouter=require('./routes/WCVN/wcvn_sdtc');
const VNWCRouter=require('./routes/WCVN/WCVN.routes');
//San Xuat
const SanXuat_Router= require('./routes/SanXuat/SanXuat.Route');

//kho
const Kho_Router=require('./routes/Kho/routes.Kho');
// const KhoQCTCRouter=require('./routes/Kho/KhoQCTC'); //xem xet loai bo
// const KhoOrderInput_Router=require('./routes/Kho/KhoOrderInput');
// const KhoOrderInput_RouterV2=require('./routes/Kho/KhoOrderInputV2');
// const KhoProductCode_Router= require('./routes/Kho/KhoProductCode');
// const KhoProductColor_Router=require('./routes/Kho/Kho_ProductColor');
// const KhoProducSize_Router=require('./routes/Kho/KhoProoductsize');
// const KhoLoaiChi_Router=require('./routes/Kho/KhoLoaiChi');
// const KhoLoaiMay_Router=require('./routes/Kho/KhoLoaiMay');
// const KhoDMCInput_Router=require('./routes/Kho/KhoDMCInput');
// const KhoCongDoanMaHangInput_Router=require('./routes/Kho/KhoCongDoanMaHangInput');
// const KhoOrderTinhChi_Router=require('./routes/Kho/KhoOrderTinhChi');

//Cat
const cat_Router=require('./routes/Cat/routes.cat');
// const CatSDTC_Router=require('./routes/Cat/CatSDTC');
// const CatTDLCard_Router=require('./routes/Cat/CatTDLCard');
// const CatLLKH_Router=require('./routes/Cat/CatLLKHCard');
// const CatMasterPattern_Router=require('./routes/Cat/CatMasterPattern');
// const CatGKT_Router=require('./routes/Cat/CatGKT');

//May
const May_Router=require('./routes/May/May.Routes');

//KiemPham
const KiemPham_Router=require('./routes/KiemPham/KiemPham.routes');

//Ki Thuat
const QTKT_Router=require('./routes/KiThuat/KiThuat.routes');

//admin
const admin_Roter=require('./routes/admin/routes.admin');

//api
const apiData_Router= require('./routes/api/api');
const { resourceUsage } = require('process');

//video 
const videoRouter= require('./routes/video/videoRoutes');
// lucky number

const luckyNumberRouter= require('./routes/luckynumber/luckynumberrouter');

// const IN_PROD= node

var app = express();

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json());

// app.use(upload());

console.log("__dirname " + path.join(__dirname, 'public'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.set('view engine', 'ejs');

app.use(logger('dev'));
//midlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join("Z:\\Technical\\Tech.1\\SẢN XUẤT THẬT\\THAO TÁC MAY CÁC CÔNG ĐOẠN\\BRA")));



app.use(session({
  // name:'sid',
  resave:false,
  saveUninitialized:false,
  secret:'somesecret',
  // cookie:{
  //   maxAge:7200000,
  //   sameSite:true,
  //   secure:false
  // },
  
}));
app.use(cookieParser(process.env.CookieParser));

//routes
app.use('/', indexRouter);
// app.use('/users', usersRouter);
//home
app.use('/home',homeRouter);
app.use('/test',testRouter)
app.use('/login',loginRouter);
app.use('/changepassword',changePasswordRouter);
app.use('/changePasswordFirst',changePasswordFirstRouter)
app.use('/QRCodeScan',QRCodeScanRouter);

// app.use('/home/kho/QCTC',KhoQCTCRouter);
//VNWC
app.use('/VNWC',VNWCRouter);
// app.use('/home/VNWC/VNWC_SDTC',VNWCSDTCCRouter);

app.use('/logout',logoutRouter);
//admin
app.use('/admin',admin_Roter);
// app.use('/admin/userlistv2', userListRouter2);
// app.use('/admin/listmenu',listMenuRouter);
// app.use('/admin/menuPermission',menuPermissionRouter);
// app.use('/admin/rolePermission',RolePermissionRouter);
// app.use('/admin/department',ListDeparmentRouter);
// app.use('/admin/positionlist',PoisitionListRouter);
// app.use('/admin/company',CompanyListRouter);
//cat
app.use('/cat',cat_Router)
// app.use('/Cat/SDTC',CatSDTC_Router);
// app.use('/Cat/TDLCard',CatTDLCard_Router);
// app.use('/Cat/LLKHCard',CatLLKH_Router);
// app.use('/Cat/CatMasterPattern',CatMasterPattern_Router);
// app.use('/Cat/GKT',CatGKT_Router);
//May
app.use('/May',May_Router);
//kho
app.use('/kho',Kho_Router);
// app.use('/kho/InputOrder',KhoOrderInput_Router);
// app.use('/kho/inputorderv2',KhoOrderInput_RouterV2);
// app.use('/kho/productcode',KhoProductCode_Router);
// app.use('/kho/prodcolor',KhoProductColor_Router);
// app.use('/kho/productsize',KhoProducSize_Router);
// app.use('/kho/loaichi',KhoLoaiChi_Router);
// app.use('/kho/loaimay',KhoLoaiMay_Router);
// app.use('/kho/DMCInput',KhoDMCInput_Router);
// app.use('/kho/congodanmahanginput',KhoCongDoanMaHangInput_Router);
// app.use('/kho/ordertinhchi',KhoOrderTinhChi_Router);
//San Xuat
app.use('/SX',SanXuat_Router);
//Kiem Pham
app.use('/kiempham',KiemPham_Router);
//Ki Thuat
app.use('/kithuat',QTKT_Router);
//api
app.use('/api',apiData_Router);

//video

app.use('/video',videoRouter);

//lucky number

app.use('/luckynumber',luckyNumberRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
