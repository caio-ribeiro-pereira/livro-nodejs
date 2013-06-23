var app = require('../app')
  , request = require('supertest')(app);

describe('No controller chat', function() {
  
  var login = {usuario: {nome: 'Teste', email: 'teste@teste'}};

  describe('o usuario logado', function() {
    
    var cookie;

    beforeEach(function(done) {
      request.post('/entrar')
             .send(login)
             .expect(200)
             .end(function(err, res) {
        cookie = res.headers['set-cookie'];
        done();
      });
    });

    it('deve retornar status 200 ao fazer GET /chat/teste', function(done){
      var req = request.get('/chat/teste');
      req.cookies = cookie;
      req.end(function(err, res) {
        res.status.should.eql(200);
        done();
      });
    });
  });

  describe('o usuario nao logado', function() {

    it('deve ir para rota / ao fazer GET /chat/teste', function(done){
      request.get('/chat/teste')
             .end(function(err, res){
        res.headers.location.should.eql('/');
        done();
      });
    });

  });

});