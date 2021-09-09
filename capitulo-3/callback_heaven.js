const fs = require('fs');
const path = require('path');

const ler = (arquivo) => {
  const dir = path.join(__dirname, arquivo);
  fs.stat(dir, (err, stat) => {
    if (err) return err;
    if (stat.isFile()) {
      console.log('%s %d bytes', arquivo, stat.size);
    }
  });
};
const lerDiretorio = () => {
  fs.readdir(__dirname, (err, diretorio) => {
    if (err) return err;
    diretorio.forEach((arquivo) => ler(arquivo));
  });
};
lerDiretorio();