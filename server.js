var fs = require("fs");

(function () { 
    var zip = require("./jszip");

    var archive = new zip();
    archive.add("smile.txt", "Smile!");
    var buffer = archive.generate(false);
    
    console.log(typeof buffer, buffer);
    
    fs.writeFile("./test_original.zip", new Buffer(buffer, 'base64'), function () {
        console.log("we're done");
    });
}());

(function () {
    var zip = require("./janzip");
    
    var archive = new zip();
    archive.add("smile.txt", new Buffer("Smile!", "utf8"));
    var buff = archive.toBuffer();
    
    fs.writeFile("./test_new.zip", buff, function () {
        console.log("im too");
    });
}())