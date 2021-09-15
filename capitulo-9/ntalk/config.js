const currentEnv = process.env.NODE_ENV || 'development';
const mongoDBURLs = {
  test: 'mongodb://localhost:27017/ntalk_test',
  development: 'mongodb://localhost:27017/ntalk'
};

module.exports = {
  currentEnv,
  sessionKey: 'ntalk.id',
  sessionSecret: 'ntalk_secret',
  mongoDBURL: mongoDBURLs[currentEnv]
};