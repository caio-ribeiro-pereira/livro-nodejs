const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// Funçao simples de gerenciamento a rotas.
const rotear = function(pathname){
  if (pathname && pathname !== '/') {
    const arquivo = path.join(__dirname, `${pathname}.html`);
    const existe = fs.existsSync(arquivo);
    if (existe) {
      return arquivo;
    }
    return path.join(__dirname, 'erro.html');
  }
  return path.join(__dirname, 'artigos.html');
};

// Iniciando Servidor do desafio
const server = http.createServer((request, response) => {
  // Obtendo o pathname digitado no browser
  const pathname = url.parse(request.url).pathname;
  // Processando roteamento do pathname
  const pagina = rotear(pathname);
  // Renderizando a pagina html
  fs.readFile(pagina, (err, html) => {
    response.writeHeader(200, {'Content-Type': 'text/html'});
    response.end(html);
  });
});

server.listen(3000, () => {
  console.log('Executando Desafio');
});