const sessionKey = 'ntalk.id';
const sessionSecret = 'ntalk_secret';

module.exports = {
  sessionKey,
  sessionSecret,
  env: process.env.NODE_ENV || 'development',
  mongodb: {
    test: 'mongodb://localhost:27017/ntalk_test',
    development: 'mongodb://localhost:27017/ntalk'
  },
  mongoose: {
    useMongoClient: true
  },
  forever: {
    max: 10,
    silent: true,
    killTree: true,
    logFile: 'logs/forever.log',
    outFile: 'logs/app.log',
    errFile: 'logs/error.log'
  },
  redis: {
    host: 'localhost',
    port: 6379
  },
  redisStore: {
    prefix: sessionKey
  },
  cache: {
    maxAge: 3600000
  }
};