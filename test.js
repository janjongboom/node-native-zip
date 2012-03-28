var fs = require("fs");
var s = fs.createReadStream(__dirname + "/janzip/throttlefs.js");

s.on("data", function() {
    console.log("data", arguments);
});
s.on("close", function() {
    console.log("close", arguments);
});
s.on("error", function() {
    console.log("error", arguments);
});