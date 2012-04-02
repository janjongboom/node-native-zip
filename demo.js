var fs = require("fs");
var zip = require("./index");

//(function () {
//    var archive = new zip();
//    
//    archive.add("hello.txt", new Buffer("Hello world", "utf8"));
//    
//    var buffer = archive.toBuffer();
//    fs.writeFile("./test1.zip", buffer, function () {
//        console.log("Finished");
//    });
//})

(function () {
    var zip = require("./index");
    
    var archive = new zip();
    archive.addFiles([ 
        { name: "test.txt", path: "./test/auction.txt" },
        { name: "sam.jpg", path: "./test/sam.jpg" }
    ]);
    
    var isclosed = false;
    
    var s = fs.createWriteStream(__dirname + "/test.zip");

    var l = 0;
    archive.on("data", function (data) {
        l += data.length;
        console.log("write", l);
        s.write(data);
        //console.log("data", data.length);
        //if (isclosed) console.trace();
    });
    archive.on("error", function (err) {
        console.log("error", err);
    });
    archive.on("close", function () {
        s.end();
        isclosed = true;
        console.log("close");
    });
    archive.toBuffer();
        
        /*
        fs.writeFile("./test_new.zip", buff, function () {
            console.log("im finished");
        });
        */
}())