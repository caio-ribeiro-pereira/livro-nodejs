module.exports = function(app) {

  var contatos = app.controllers.contatos;
  app.get('/contatos', contatos.index);
  app.get('/contato/:id', contatos.show);
  app.post('/contato', contatos.create);
  app.get('/contato/:id/editar', contatos.edit);
  app.put('/contato/:id', contatos.update);
  app.del('/contato/:id', contatos.destroy);

};