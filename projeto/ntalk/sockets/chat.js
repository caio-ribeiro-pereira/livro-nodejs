module.exports = function(app) {

  var Usuario = app.models.usuario
    , sockets = app.io.sockets;

  sockets.on('connection', function (client) {
    var session = client.handshake.session
      , usuario = session.usuario;

    client.broadcast.emit('notifyOnlines', usuario.email);

    client.on('toServer', function (mensagem) {
      mensagem = "<b>"+usuario.nome+":</b> "+mensagem+"<br>";
      client.emit('toClient', mensagem);
      client.broadcast.emit('toClient', mensagem);
      client.broadcast.emit('notifyMessage', usuario.email);
    });

    client.on('notifyServer', function(email){
      
    });
  });

};