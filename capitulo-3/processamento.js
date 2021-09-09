const https = require('https');
const fs = require('fs');
const leituraAsync = require('./leitura_async');
const leituraSync = require('./leitura_sync');

const arquivo = './node-v16.9.0.tar.gz';
const stream = fs.createWriteStream(arquivo);
const download = 'https://nodejs.org/dist/latest/node-v16.9.0.tar.gz';

https.get(download, (res) => {
  console.log('Fazendo download do Node.js');
  res.on('data', (data) => stream.write(data));
  res.on('end', () => {
    stream.end();
    console.log('Download finalizado!');
    leituraAsync(arquivo);
    leituraSync(arquivo);
  });
});