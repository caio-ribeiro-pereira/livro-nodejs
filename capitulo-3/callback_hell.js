const fs = require('fs');
const path = require('path');

fs.readdir(__dirname, (readErr, contents) => {
  if (readErr) {
    throw readErr;
  }
  contents.forEach((content) => {
    const dir = path.join(__dirname, content);
    fs.stat(dir, (statErr, stat) => {
      if (statErr) {
        throw statErr;
      }
      if (stat.isFile()) {
        console.log('%s %d bytes', content, stat.size);
      }
    });
  });
});