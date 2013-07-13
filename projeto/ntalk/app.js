var express = require('express')
  , app = express()
  , load = require('express-load')
  , server = require('http').createServer(app)
  , error = require('./middleware/error')
  , io = require('socket.io').listen(server)
  , redis = require('./middleware/redis_connect')
  , ExpressStore = redis.getExpressStore()
  , SocketStore = redis.getSocketStore()
;

const SECRET = 'Ntalk', KEY = 'ntalk.sid'
    , MAX_AGE = {maxAge: 60 * 60 * 1000}
    , GZIP_LVL = {level: 9, memLevel: 9};

var cookie = express.cookieParser(SECRET)
  , storeOpts = {client: redis.getClient(), prefix: KEY}
  , store = new ExpressStore(storeOpts)
  , sessOpts = {secret: SECRET, key: KEY, store: store}
  , session = express.session(sessOpts);

app.use(express.logger('dev'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookie);
app.use(session);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.compress(GZIP_LVL));
app.use(app.router);
app.use(express.static(__dirname + '/public', MAX_AGE));
app.use(error.notFound);
app.use(error.serverError);

io.enable('browser client cache');
io.enable('browser client minification');
io.enable('browser client etag');
io.enable('browser client gzip');
io.set('log level', 1);
io.set('store', new SocketStore);
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
  .into(app);

load('sockets')
  .into(io);

server.listen(3000, function(){
  console.log("Rodando Ntalk.");
});

module.exports = app;
