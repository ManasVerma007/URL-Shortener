const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) {
    console.log("No userid")
    return res.redirect("/login");}

  const user = getUser(userUid);

  if (!user) {
    console.log("No user")
    return res.redirect("/login");}
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;
  
    const user = getUser(userUid);
  
    req.user = user;
    next();
  }

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
