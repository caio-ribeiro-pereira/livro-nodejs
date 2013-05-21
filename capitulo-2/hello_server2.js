var http = require('http');
 
function atendeRequisicao(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<h1>Hello World!</h1>");
  response.end();
}


var server = http.createServer(atendeRequisicao);
  
function servidorLigou() {
  console.log('Servidor Hello World rodando!');
}

server.listen(3000, servidorLigou);