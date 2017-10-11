module.exports = (app, io) => {
  const onlines = {};
  io.on('connection', (client) => {
    const { session } = client.handshake;
    const { usuario } = session;

    onlines[usuario.email] = usuario.email;
    for (let email in onlines) {
      client.emit('notify-onlines', email);
      client.broadcast.emit('notify-onlines', email);
    }

    client.on('send-server', (hashDaSala, msg) => {
      const resposta = `<b>${usuario.nome}:</b> ${msg}<br>`;
      const novaMensagem = { email: usuario.email, sala: hashDaSala };
      session.sala = hashDaSala;
      client.broadcast.emit('new-message', novaMensagem);
      io.to(hashDaSala).emit('send-client', resposta);
    });

    client.on('create-room', (hashDaSala) => {
      session.sala = hashDaSala;
      client.join(hashDaSala);
    });

    client.on('disconnect', () => {
      const { sala } = session;
      const resposta = `<b>${usuario.nome}:</b> saiu.<br>`;
      delete onlines[usuario.email];
      client.leave(sala);
      client.broadcast.emit('notify-offlines', usuario.email);
      io.to(sala).emit('send-client', resposta);
    });
  });
};