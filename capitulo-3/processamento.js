const http = require('http');
const fs = require('fs');
const leituraAsync = require('./leitura_async');
const leituraSync = require('./leitura_sync');
const arquivo = './node.exe';
const stream = fs.createWriteStream(arquivo);
const download = 'http://nodejs.org/dist/latest/node.exe';
http.get(download, (res) => {
  console.log('Fazendo download do Node.js');
  res.on('data', (data) => stream.write(data));
  res.on('end', () => {
    stream.end();
    console.log('Download finalizado!');
    leituraAsync(arquivo);
    leituraSync(arquivo);
  });
});