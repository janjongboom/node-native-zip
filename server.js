var zip = require("./jszip");

var archive = new zip("DEFLATE");
archive.add("smile.txt", "Smile!");
var buffer = archive.generate(false);

console.log(typeof buffer, buffer);

var fs = require("fs");
fs.writeFile("./test.zip", new Buffer(buffer, 'base64'), function () {
    console.log("we're done");
});