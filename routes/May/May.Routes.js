const express = require('express');
const router = express.Router();
const MayControl = require('../../Controlers/May/May.Control');

router.get('/QTSX', MayControl.MayQTSX)

module.exports = router;