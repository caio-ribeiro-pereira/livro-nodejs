module.exports = function(app) {

  var Usuario = app.models.usuario;

  var HomeController = {
    index: function(req, res) {
      res.render('home/index');
    },

    login: function(req, res) {
      var query = {email: req.body.usuario.email};
      Usuario.findOne(query)
             .select('nome email')
             .exec(function(erro, usuario){
        if (usuario) {
          req.session.usuario = usuario;
          res.redirect('/contatos');
        
        } else {
          Usuario.create(req.body.usuario, function(erro, usuario) {
            if(erro){
              res.redirect('/');
            }else{
              req.session.usuario = usuario;
              res.redirect('/contatos');
            }
          });
        }
      });
    },

    logout: function(req, res) {
      req.session.destroy();
      res.redirect('/');
    }
  };

  return HomeController;

};