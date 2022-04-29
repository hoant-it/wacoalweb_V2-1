var express = require('express');
const { Cookie } = require('express-session');
var router = express.Router();
// const videoHomeControl= require('../Controlers/video/videoHome.control');


//

// router.get('/', async (req,res) => {

//   // console.log(req.session);
// res.redirect('/login')


// });


router.get('/', async (req, res) => {
  res.redirect('/login')

  // res.render('video/videohome')
})




module.exports = router;


