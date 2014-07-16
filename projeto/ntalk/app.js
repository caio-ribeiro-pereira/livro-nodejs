var express = require('express')
  , app = express()
  , load = require('express-load')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , expressSession = require('express-session')
  , compression = require('compression')
  , methodOverride = require('method-override')
  , morgan = require('morgan')
  , server = require('http').Server(app)
  , error = require('./middleware/error')
  , cfg = require('./config.json')
  , io = require('socket.io').listen(server)
  , redis = require('./lib/redis_connect')
  , ExpressStore = redis.getExpressStore()
  , SocketStore = redis.getSocketStore()
  , cookie = cookieParser(cfg.SECRET)
  , store = new ExpressStore({client: redis.getClient(), prefix: cfg.KEY})
;

app.use(morgan('dev'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookie);
app.use(expressSession({
  secret: cfg.SECRET, 
  name: cfg.KEY, 
  resave: true,
  saveUninitialized: true,
  store: store
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(compression(cfg.GZIP_LVL));
app.use(express.static(__dirname + '/public', cfg.MAX_AGE));

io.enable('browser client cache');
io.enable('browser client minification');
io.enable('browser client etag');
io.enable('browser client gzip');
io.set('log level', 1);
io.set('store', new SocketStore);
io.set('authorization', function(data, accept) {
  cookie(data, {}, function(err) {
    var sessionID = data.signedCookies[cfg.KEY];
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

app.use(error.notFound);
app.use(error.serverError);

server.listen(3000, function(){
  console.log("Rodando Ntalk.");
});

module.exports = app;
