module.exports = (app, io) => {
  const onlines = {};
  io.on('connection', (client) => {
    const { session } = client.handshake;

    client.on('send-server', (msg) => {
      const { usuario, sala } = session;
      const resposta = `<b>${usuario.nome}:</b> ${msg}<br>`;
      const novaMensagem = { email: usuario.email, sala };
      onlines[usuario.email] = usuario.email;
      for (let email in onlines) {
        client.emit('notify-onlines', email);
        client.broadcast.emit('notify-onlines', email);
      }
      io.to(sala).emit('send-client', resposta);
      client.broadcast.emit('new-message', novaMensagem);
    });

    client.on('create-room', (sala) => {
      session.sala = sala;
      client.join(sala);
    });

    client.on('disconnect', () => {
      const { usuario, sala } = session;
      const resposta = `<b>${usuario.nome}:</b> saiu.<br>`;
      delete onlines[usuario.email];
      client.broadcast.emit('notify-offlines', usuario.email);
      io.to(sala).emit('send-client', resposta);
      client.leave(sala);
    });
  });
};