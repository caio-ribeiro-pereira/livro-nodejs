const app = require('../../app');
const request = require('supertest')(app);

describe('No controller home', () => {
  it('GET "/" retorna status 200', (done) => {
    request.get('/').end((err, res) => {
      res.status.should.eql(200);
      done();
    });
  });

  it('GET "/sair" redireciona para GET "/"', (done) => {
    request.get('/sair').end((err, res) => {
      res.headers.location.should.eql('/');
      done();
    });
  });

  it('POST "/entrar" válido redireciona para GET "/contatos"', (done) => {
    const usuario = { nome: 'Teste', email: 'teste@teste' };
    request.post('/entrar')
      .send({ usuario })
      .end((err, res) => {
      res.headers.location.should.eql('/contatos');
      done();
    });
  });

  it('POST "/entrar" inválido redireciona para GET "/"', (done) => {
    const usuario = { nome: '', email: '' };
    request.post('/entrar')
      .send({ usuario })
      .end((err, res) => {
        res.headers.location.should.eql('/');
        done();
      });
  });
});
