const currentEnv = process.env.NODE_ENV || 'development';
const mongoDBURLs = {
  test: 'mongodb://localhost:27017/ntalk_test',
  development: 'mongodb://localhost:27017/ntalk'
};
const sessionKey = 'ntalk.id';
const sessionSecret = 'ntalk_secret';

module.exports = {
  currentEnv,
  sessionKey,
  sessionSecret,
  mongoDBURL: mongoDBURLs[currentEnv],
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
  cache: {
    maxAge: 3600000
  }
};