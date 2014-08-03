module.exports = function(req, res, next) {
  if(!req.session.usuario) {
    return res.redirect('/');
  }
  return next();
};