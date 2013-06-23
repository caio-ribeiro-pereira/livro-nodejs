var express = require('express')
  , app = express()
  , load = require('express-load')
  , flash = require('connect-flash')
  , server = require('http').createServer(app)
  , error = require('./middleware/error')
  , dbConnect = require('./middleware/db-connect')
;

global.io = require('socket.io').listen(server);
global.db = dbConnect();

const SECRET = 'Ntalk', KEY = 'ntalk.sid';

var cookie = express.cookieParser(SECRET)
  , store = new express.session.MemoryStore()
  , session = express.session({secret: SECRET
                             , key: KEY
                             , store: store});

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

io.set('authorization', function(data, accept) {
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

module.exports = app;