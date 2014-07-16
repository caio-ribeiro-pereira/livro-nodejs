var redis = require('redis')
  , redisStore = require('connect-redis')
  , session = require('express-session')
  , socketio = require('socket.io')
;

exports.getClient = function() {
  return redis.createClient();
}
  
exports.getExpressStore = function() {
  return redisStore(session);
}

exports.getSocketStore = function() {
  return socketio.RedisStore;
}