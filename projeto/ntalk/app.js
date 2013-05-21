var express = require('express')
  , app = express()
  , error = require('./error')
  , load = require('express-load')
  , flash = require('connect-flash')
  , server = require('http').createServer(app)
  , mongoose = require('mongoose');

app.io = require('socket.io').listen(server)
app.db = mongoose.connect('mongodb://localhost/ntalk');
app.onlines = {};

const SECRET = 'Ntalk'
    , KEY = 'ntalk.sid';

var cookie = express.cookieParser(SECRET)
  , store = new express.session.MemoryStore()
  , session = express.session({secret: SECRET
                             , key: KEY
                             , store: store});

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(cookie);
  app.use(session);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(flash());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(error.notFound);
  app.use(error.serverError);
});

app.io.set('authorization', function(data, accept) {
  cookie(data, {}, function(err) {
    var sessionID = data.signedCookies[KEY];
    store.get(sessionID, function(err, session) {
      if (err || !session) {
        accept(null, false);
      } else {
        data.session = session;
        accept(null, true);
      }
    });
  });
});

load('models')
  .then('controllers')
  .then('routes')
  .then('sockets')
  .into(app);

server.listen(3000, function(){
  console.log("Rodando Ntalk.");
});