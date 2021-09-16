const config = require('../config.js');
const redis = require('redis').createClient(config.redis);

module.exports = (app, io) => {
  io.on('connection', (client) => {
    const { session } = client.handshake;
    const { usuario } = session;

    redis.sadd('onlines', usuario.email, () => {
      redis.smembers('onlines', (err, emails) => {
        emails.forEach((email) => {
          client.emit('notify-onlines', email);
          client.broadcast.emit('notify-onlines', email);
        });
      });
    });

    client.on('send-server', (hashDaSala, msg) => {
      const resposta = `<b>${usuario.nome}:</b> ${msg}<br>`;
      const novaMensagem = { email: usuario.email, sala: hashDaSala };
      session.sala = hashDaSala;
      redis.lpush(hashDaSala, resposta, () => {
        client.broadcast.emit('new-message', novaMensagem);
        io.to(hashDaSala).emit('send-client', resposta);
      });
    });

    client.on('create-room', (hashDaSala) => {
      session.sala = hashDaSala;
      client.join(hashDaSala);
      const resposta = `<b>${usuario.nome}:</b> entrou.<br>`;
      redis.lpush(hashDaSala, resposta, () => {
        redis.lrange(hashDaSala, 0, -1, (err, msgs) => {
          msgs.forEach((msg) => {
            io.to(hashDaSala).emit('send-client', resposta);
          });
        });
      });
    });

    client.on('disconnect', () => {
      const { sala } = session;
      const resposta = `<b>${usuario.nome}:</b> saiu.<br>`;
      redis.lpush(sala, resposta, () => {
        session.sala = null;
        redis.srem('onlines', usuario.email);
        client.leave(sala);
        client.broadcast.emit('notify-offlines', usuario.email);
        io.to(sala).emit('send-client', resposta);
      });
    });
  });
};
