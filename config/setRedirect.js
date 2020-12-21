module.exports = (req, res, next) => {
  
  let redirectTo = new URL(req.headers.referer);
  req.redirectTo = redirectTo.pathname;
  next();
}