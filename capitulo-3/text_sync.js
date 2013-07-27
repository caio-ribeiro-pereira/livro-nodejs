var fs = require('fs');

for(var i = 1; i <= 5; i++) {
  var file = "sync-txt" + i + ".txt";
  var out = fs.writeFileSync(file, "Hello Node.js!");
  console.log(out);
}