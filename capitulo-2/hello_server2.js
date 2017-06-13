const http = require('http');
 
const atendeRequisicao = (request, response) => {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write('<h1>Hello World!</h1>');
  response.end();
}


const server = http.createServer(atendeRequisicao);
  
const servidorLigou = () => {
  console.log('Servidor Hello World rodando!');
}

server.listen(3000, servidorLigou);