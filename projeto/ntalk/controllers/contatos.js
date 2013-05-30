module.exports = function(app) {

  var Usuario = app.models.usuario;

  var ContatoController = {

    index: function(req, res) {
      var _id = req.session.usuario._id;
      Usuario.findById(_id, function(erro, usuario) {
        var contatos = usuario.contatos;
        var resultado = {contatos: contatos
                       , mensagem: req.flash('warning')};
        res.render('contatos/index', resultado);
      });
    },

    create: function(req, res) {
      var _id = req.session.usuario._id;
      Usuario.findById(_id, function(erro, usuario) {
        var contato = req.body.contato;
        usuario.contatos.push(contato);
        usuario.save();
        res.redirect('/contatos');
      });
    },

    show: function(req, res) {
      var _id = req.session.usuario._id;
      Usuario.findById(_id, function(erro, usuario) {
        var contatoID = req.params.id;
        var contato = usuario.contatos.id(contatoID);
        var resultado = {contato: contato
                       , mensagem: req.flash('warning')};
        res.render('contatos/show', resultado);
      });
    },

    edit: function(req, res) {
      var _id = req.session.usuario._id;
      Usuario.findById(_id, function(erro, usuario) {
        var contatoID = req.params.id;
        var contato = usuario.contatos.id(contatoID);
        var resultado = {contato: contato
                       , mensagem: req.flash('warning')};
        res.render('contatos/edit', resultado);
      });
    },

    update: function(req, res) {
      var _id = req.session.usuario._id;
      var contatoID = req.params.id;
      var contato = req.body.contato;
      var where = {_id: _id, "contatos._id": contatoID};
      var params = {"contatos.$.nome": contato.nome
                   ,"contatos.$.email": contato.email};
      var set = {$set: params};
      Usuario.update(where, set, function(erro, afetados) {
        res.redirect('/contatos');  
      });
    },

    destroy: function(req, res) {
      var _id = req.session.usuario._id;
      Usuario.findById(_id, function(erro, usuario) {
        var contatoID = req.params.id;
        usuario.contatos.id(contatoID).remove();
        usuario.save();
        res.redirect('/contatos');  
      });
    }
  }
  return ContatoController;
};