const { Types: { ObjectId } } = require('mongoose');

module.exports = (app) => {
  const Usuario = app.models.usuario;

  const ContatosController = {
    index(req, res) {
      const { _id } = req.session.usuario;
      Usuario.findById(_id)
        .then((usuario) => {
          const { contatos } = usuario;
          res.render('contatos/index', { contatos });
        })
        .catch(() => res.redirect('/'))
      ;
    },
    create(req, res) {
      const { contato } = req.body;
      const { _id } = req.session.usuario;
      const set = { $push: { contatos: contato } };
      Usuario.findByIdAndUpdate(_id, set)
        .then(() => res.redirect('/contatos'))
        .catch(() => res.redirect('/'))
      ;
    },
    show(req, res) {
      const { _id } = req.session.usuario;
      const contatoId = req.params.id;
      Usuario.findById(_id)
        .then((usuario) => {
          const { contatos } = usuario;
          const contato = contatos.find((contato) => {
            return contato._id === ObjectId(contatoId);
          });
          res.render('contatos/show', { contato });
        })
        .catch(() => res.redirect('/'))
      ;
    },
    edit(req, res) {
      const { _id } = req.session.usuario;
      const contatoId = req.params.id;
      Usuario.findById(_id)
        .then((usuario) => {
          const { contatos } = usuario;
          const contato = contatos.find((contato) => {
            return contato._id === ObjectId(contatoId);
          });
          res.render('contatos/edit', { contato, usuario });
        })
        .catch(() => res.redirect('/'))
      ;
    },
    update(req, res) {
      const contatoId = req.params.id;
      const { contato } = req.body;
      const { usuario } = req.session;
      const where = { 'contatos._id': contatoId };
      const set = { $set: { 'contatos.$': contato } };
      Usuario.update(where, set)
        .then(() => res.redirect('/contatos'))
        .catch(() => res.redirect('/'))
      ;
    },
    destroy(req, res) {
      const contatoId = req.params.id;
      const { _id } = req.session.usuario;
      const where = { _id };
      const set = { $pull: { contatos: { _id: ObjectId(contatoId) } } };
      Usuario.update(where, set)
        .then(() => res.redirect('/contatos'))
        .catch(() => res.redirect('/'))
      ;
    }
  };
  return ContatosController;
};