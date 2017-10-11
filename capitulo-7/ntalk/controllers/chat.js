const crypto = require('crypto');

module.exports = (app) => {
  const ChatController = {
    index(req, res) {
      const { sala } = req.query;
      let hashDaSala = sala;
      if (!hashDaSala) {
        const timestamp = Date.now().toString();
        const md5 = crypto.createHash('md5');
        hashDaSala = md5.update(timestamp).digest('hex');
      }
      res.render('chat/index', { sala: hashDaSala });
    }
  };
  return ChatController;
};