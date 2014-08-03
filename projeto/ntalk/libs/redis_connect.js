var redis = require('redis')
  , redisStore = require('connect-redis')
  , session = require('express-session')
;

exports.getClient = function() {
  return redis.createClient();
}
  
exports.getExpressStore = function() {
  return redisStore(session);
}