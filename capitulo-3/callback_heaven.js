var fs = require('fs');

var lerDiretorio = function() {
  fs.readdir(__dirname, function(erro, diretorio) {
    diretorio.forEach(function(arquivo) {
      lerArquivo(arquivo);
    });
  });
};

var lerArquivo = function(arquivo) {
  var path = './' + arquivo;
  fs.stat(path, function(erro, stat) {
    if (stat.isFile()) {
      console.log('%s %d bytes', arquivo, stat.size);
    }
  });
};

lerDiretorio();