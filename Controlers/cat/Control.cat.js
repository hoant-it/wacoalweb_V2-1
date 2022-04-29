// const db= require('../../databases/database')
module.exports.CatGKT = async(req, res) => {
    res.render('Cat/CatGKT', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}

module.exports.CatLHKHCard = async(req, res) => {
    res.render('Cat/CatLLKHCard', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}

module.exports.CatMasterPattern = async(req, res) => {
    res.render('Cat/CatMasterPattern', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}

module.exports.CatSDTC = async(req, res) => {
    res.render('Cat/CatSDTC', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}

module.exports.CatTDLCard = async(req, res) => {
    res.render('Cat/CatTDLCard', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}