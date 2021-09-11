module.exports = (app) => {
  const Usuario = app.models.usuario;

  const HomeController = {
    index(req, res) {
      res.render('home/index');
    },
    async login(req, res) {
      const { usuario } = req.body;
      const { email, nome } = usuario;
      const where = { email, nome };
      const set = {
        $setOnInsert: { email, nome, contatos: [] }
      };
      const options = { upsert: true, new: true };
      try {
        const usuario = await Usuario
          .findOneAndUpdate(where, set, options)
          .select('email nome')
        ;
        req.session.usuario = usuario;
        res.redirect('/contatos');
      } catch {
        res.redirect('/');
      }
    },
    logout(req, res) {
      req.session.destroy();
      res.redirect('/');
    }
  };
  return HomeController;
};