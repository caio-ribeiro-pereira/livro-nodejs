const fs = require('fs');
const path = require('path');

fs.readdir(__dirname, (erro, contents) => {
if (erro) { throw erro; }
contents.forEach((content) => {
    const dir = path.join(__dirname, content);
    fs.stat(dir, (erro, stat) => {
    if (erro) { throw erro; }
    if (stat.isFile()) {
        console.log('%s %d bytes', content, stat.size);
    }
    });
});
});