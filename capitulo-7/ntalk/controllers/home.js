module.exports = (app) => {
  const Usuario = app.models.usuario;

  const HomeController = {
    index(req, res) {
      res.render('home/index');
    },
    login(req, res) {
      const { usuario } = req.body;
      const { email, nome } = usuario;
      const where = { email, nome };
      const set = { $set: { email, nome }};
      const options = { upsert: true, runValidators: true };
      Usuario.findOneAndUpdate(where, set, options)
        .then((usuario) => {
          req.session.usuario = usuario;
          res.redirect('/contatos');
        })
        .catch((err) => {
          res.redirect('/');
        })
      ;
    },
    logout(req, res) {
      req.session.destroy();
      res.redirect('/');
    }
  };
  return HomeController;
};