module.exports = (app, io) => {
  io.on('connection', (client) => {
    client.on('send-server', (data) => {
      const msg = `<b>${data.nome}:</b> ${data.msg}<br>`;
      client.emit('send-client', msg);
      client.broadcast.emit('send-client', msg);
    });
  });
};