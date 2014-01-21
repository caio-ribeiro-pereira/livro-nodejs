var redis = require('redis')
  , redisStore = require('connect-redis')
  , express = require('express')
  , socketio = require('socket.io')
;

exports.getClient = function() {
  return redis.createClient();
}
  
exports.getExpressStore = function() {
  return redisStore(express);
}

exports.getSocketStore = function() {
  return socketio.RedisStore;
}