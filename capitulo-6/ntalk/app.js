const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const consign = require('consign');
const bodyParser = require('body-parser');
const cookie = require('cookie');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const config = require('./config');
const error = require('./middlewares/error');

const app = express();
const server = http.Server(app);
const io = socketIO(server);
const store = new expressSession.MemoryStore();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressSession({
  store,
  resave: true,
  saveUninitialized: true,
  name: config.sessionKey,
  secret: config.sessionSecret
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

io.use((socket, next) => {
  const cookieData = socket.request.headers.cookie;
  const cookieObj = cookie.parse(cookieData);
  const sessionHash = cookieObj[config.sessionKey] || '';
  const sessionID = sessionHash.split('.')[0].slice(2);
  store.all((err, sessions) => {
    const currentSession = sessions[sessionID];
    if (err || !currentSession) {
      return next(new Error('Acesso negado!'));
    }
    socket.handshake.session = currentSession;
    return next();
  });
});

consign({})
  .include('models')
  .then('controllers')
  .then('routes')
  .then('events')
  .into(app, io)
;

app.use(error.notFound);
app.use(error.serverError);

server.listen(3000, () => console.log('Ntalk no ar.'));