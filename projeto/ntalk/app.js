var express = require('express')
  , load = require('express-load')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , expressSession = require('express-session')
  , compression = require('compression')
  , methodOverride = require('method-override')
  , morgan = require('morgan')
  , error = require('./middlewares/error')
  , cfg = require('./config.json')
  , app = express()
  , server = require('http').Server(app)
  , io = require('socket.io')(server)
  , redis = require('./libs/redis_connect')
  , ExpressStore = redis.getExpressStore()
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
// app.use(compression());
app.use(express.static(__dirname + '/public', cfg.MAX_AGE));

io.use(function(socket, next) {
  var data = socket.request;
  cookie(data, {}, function(err) {
    var sessionID = data.signedCookies[cfg.KEY];
    store.get(sessionID, function(err, session) {
      if (err || !session) {
        return next(new Error('acesso negado'));
      } else {
        socket.handshake.session = session;
        return next();
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
