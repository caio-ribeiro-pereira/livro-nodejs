module.exports = function(app) {

  var ChatController = {
    index: function(req, res){
      var resultado = {email: req.params.email};
      res.render('chat/index', resultado);
    }
  };

  return ChatController;

};