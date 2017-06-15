module.exports = (app) => {
  const ChatController = {
    index(req, res) {
      const { usuario } = req.session;
      res.render('chat/index', { usuario });
    }
  };
  return ChatController;
};