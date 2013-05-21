module.exports = function(app) {

  var Usuario = app.models.usuario;

  var HomeController = {
    index: function(req, res) {
      var resultado = {mensagem: req.flash('warning')};
      res.render('home/index', resultado);
    },

    login: function(req, res) {
      Usuario.findOne(req.body.usuario)
             .select('nome email')
             .exec(function(erro, usuario){
        if(erro){
          req.flash('warning','Preencha os campos.');
          res.redirect('/');
        
        } else if (usuario) {
          req.session.usuario = usuario;
          res.redirect('/contatos');
        
        } else {
          Usuario.create(req.body.usuario)
                 .exec(function(erro, usuario) {
            if(erro){
              req.flash('warning','Preencha os campos.');
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