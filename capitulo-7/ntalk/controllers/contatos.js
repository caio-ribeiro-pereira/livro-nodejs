const { Types: { ObjectId } } = require('mongoose');

module.exports = (app) => {
  const Usuario = app.models.usuario;

  const ContatosController = {
    async index(req, res) {
      try {
        const id = ObjectId(req.session.usuario._id);
        const usuario = await Usuario.findById(id);
        const { contatos } = usuario;
        res.render('contatos/index', { contatos });
      } catch {
        res.redirect('/');
      }
    },
    async create(req, res) {
      try {
        const { contato } = req.body;
        const id = ObjectId(req.session.usuario._id);
        const set = { $push: { contatos: contato } };
        await Usuario.findByIdAndUpdate(id, set);
        res.redirect('/contatos');
      } catch {
        res.redirect('/');
      }
    },
    async show(req, res) {
      try {
        const id = ObjectId(req.session.usuario._id);
        const contatoId = ObjectId(req.params.id);
        const usuario = await Usuario.findById(id);
        const { contatos } = usuario;
        const contato = contatos.find((ct) => {
          return ct._id.toString() === contatoId.toString();
        });
        res.render('contatos/show', { contato });
      } catch {
        res.redirect('/');
      }
    },
    async edit(req, res) {
      try {
        const id = ObjectId(req.session.usuario._id);
        const contatoId = ObjectId(req.params.id);
        const usuario = await Usuario.findById(id);
        const { contatos } = usuario;
        const contato = contatos.find((ct) => {
          return ct._id.toString() === contatoId.toString();
        });
        res.render('contatos/edit', { contato, usuario });
      } catch {
        res.redirect('/');
      }
    },
    async update(req, res) {
      try {
        const contatoId = ObjectId(req.params.id);
        const usuarioId = ObjectId(req.session.usuario._id);
        const { contato } = req.body;
        const where = { _id: usuarioId, 'contatos._id': contatoId };
        const set = { $set: { 'contatos.$': contato } };
        await Usuario.updateOne(where, set);
        res.redirect('/contatos');
      } catch {
        res.redirect('/');
      }
    },
    async destroy(req, res) {
      try {
        const contatoId = ObjectId(req.params.id);
        const usuarioId = ObjectId(req.session.usuario._id);
        const where = { _id: usuarioId };
        const set = { $pull: { contatos: { _id: contatoId } } };
        await Usuario.updateOne(where, set);
        res.redirect('/contatos');
      } catch {
        res.redirect('/');
      }
    }
  };
  return ContatosController;
};