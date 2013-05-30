module.exports = function(app) {

  var crypto = require('crypto')
    , md5 = crypto.createHash('md5')
    , sockets = io.sockets;

  sockets.on('connection', function (client) {

    var session = client.handshake.session
      , usuario = session.usuario;

    client.set('email', usuario.email);

    var onlines = sockets.clients();
    onlines.forEach(function(online) {
      var email = online.store.data.email;
      client.emit('notify-onlines', email);
      client.broadcast.emit('notify-onlines', email);
    });
  
    client.on('join', function(sala) {
      if(sala){
        sala = sala.replace('?','');
      } else {
        var timestamp = new Date().getTime();
        sala = md5.digest(timestamp);
      }
      console.log(sala);
      client.set('sala', sala);
      client.join(sala);

      var msg = "<b>"+usuario.nome+":</b> entrou.<br>";
      sockets.in(sala).emit('send-client', msg);
    });

    client.on('send-server', function (msg) {
      var msg = "<b>"+ usuario.nome +":</b> "+ msg +"<br>";
      client.get('sala', function(erro, sala) {
        var data = {email: usuario.email, sala: sala};
        client.broadcast.emit('new-message', data);
        sockets.in(sala).emit('send-client', msg);
      });
    });

    client.on('disconnect', function() {
      client.get('sala', function(erro, sala) {
        var msg = "<b>"+ usuario.nome +":</b> saiu.<br>";
        client.broadcast.emit('notify-offline', usuario.email);
        sockets.in(sala).emit('send-client', msg);
        client.leave(sala);
      });
    });
  });
};
