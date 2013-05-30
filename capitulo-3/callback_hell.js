var fs = require('fs');

fs.readdir(__dirname, function(erro, contents) {
    
    contents.forEach(function(content) {

        var path = './' + content;
        
        fs.stat(path, function(erro, stat) {
            
            if (stat.isFile()) {
                console.log('%s %d bytes', content, stat.size);
            }

        });

    });

});