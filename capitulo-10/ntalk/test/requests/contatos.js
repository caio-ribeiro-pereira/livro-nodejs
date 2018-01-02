const app = require('../../app');
const request = require('supertest')(app);

describe('No controller contatos', () => {
  describe('usuario nao logado', () => {
    it('GET "/contatos" redireciona para GET "/"', (done)=> {
      request.get('/contatos').end((err, res) => {
        res.headers.location.should.eql('/');
        done();
      });
    });
    it('GET "/contato/1" redireciona para GET "/"', (done)=> {
      request.get('/contato/1').end((err, res) => {
        res.headers.location.should.eql('/');
        done();
      });
    });
    it('GET "/contato/1/editar" redireciona para GET "/"', (done)=> {
      request.get('/contato/1/editar').end((err, res) => {
        res.headers.location.should.eql('/');
        done();
      });
    });
    it('POST "/contato" redireciona para GET "/"', (done)=> {
      request.post('/contato').end((err, res) => {
        res.headers.location.should.eql('/');
        done();
      });
    });
    it('DELETE "/contato/1" redireciona para GET "/"',(done)=> {
      request.del('/contato/1').end((err, res) => {
        res.headers.location.should.eql('/');
        done();
      });
    });
    it('PUT "/contato/1" redireciona para GET "/"', (done)=> {
      request.put('/contato/1').end((err, res) => {
        res.headers.location.should.eql('/');
        done();
      });
    });
  });

  describe('usuario logado', () => {
    const usuario = { nome: 'Teste', email: 'teste@teste' };
    let cookie = null;
    
    beforeEach((done) => {
      request.post('/entrar')
        .send({ usuario })
        .end((err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
    });

    it('GET "/contatos" retorna status 200', (done) => {
      const req = request.get('/contatos');
      req.cookies = cookie;
      req.end((err, res) => {
        res.status.should.eql(200);
        done();
      });
    });

    it('POST "/contato" redireciona para GET "/contatos"', (done) => {
      const contato = usuario;
      const req = request.post('/contato');
      req.cookies = cookie;
      req.send({ contato }).end((err, res) => {
        res.headers.location.should.eql('/contatos');
        done();
      });
    });
  });
});