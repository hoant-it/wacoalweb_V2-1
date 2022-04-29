module.exports.redirectLogin = (req, res, next) => {
  if (req.signedCookies.webLoginFist === "false") {
    res.redirect("/changePasswordFirst");
  } else {
    if (!req.signedCookies.userId) {
      res.redirect("/login");
    }
    next();
  }
 
};
