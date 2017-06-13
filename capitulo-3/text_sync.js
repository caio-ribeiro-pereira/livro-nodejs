const fs = require('fs');

for (let i = 1; i <= 5; i++) {
  const file = `sync-txt${i}.txt`;
  const out = fs.writeFileSync(file, 'Hello Node.js!');
  console.log(out);
}