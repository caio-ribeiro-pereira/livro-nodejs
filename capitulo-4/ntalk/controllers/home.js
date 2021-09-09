module.exports = (app) => {
  const HomeController = {
    index(req, res) {
      res.render('home/index');
    }
  };
  return HomeController;
};