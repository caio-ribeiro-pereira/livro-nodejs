var mongoose = require('mongoose')
  , single_connection
  , env_url = {
    "test": "mongodb://localhost/ntalk_test",
    "development": "mongodb://localhost/ntalk"
  }
;

module.exports = function() {  
  var url = env_url[process.env.NODE_ENV];
  
  if(!single_connection) {
    single_connection = mongoose.connect(url);
  }
  
  return single_connection;
};
