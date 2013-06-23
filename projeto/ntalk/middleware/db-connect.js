module.exports = function() {
  var mongoose = require('mongoose');
  var url = {
    "test": "mongodb://localhost/ntalk_test",
    "development": "mongodb://localhost/ntalk"
  };
  return mongoose.connect(url[process.env.NODE_ENV]);
};
