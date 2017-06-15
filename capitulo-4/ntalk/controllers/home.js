module.exports = (app) => {
  const HomeController = {
    index: function(req, res) {
      res.render('home/index');
    }
  };
  return HomeController;
};