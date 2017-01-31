var http = require('http'); // module for sending/receiving HTTP requests and creating HTTP servers
var fs = require('fs'); // module for working with files and directories on disk
var path = require('path'); // module for working with file path strings
var mime = require('mime'); // module for working with file mime-types

// Error: Not-found response handler
function send404(response){
    response.writeHead(404, {"Content-Type" : "text/plain"});
    response.write("Error 404: resource not found");
    response.end();
}

// Static file response handler
function sendPage(response, filePath, fileContents){
    response.writeHead(200, {"Content-Type" : mime.lookup(path.basename(filePath))});
    response.end(fileContents);
}

// API Data response handler
function sendData(response, data){
    response.writeHead(200, {"Content-Type" : mime.lookup("json")});
    response.end(JSON.stringify(data));
}

function serverWorking(response, absPath){
    fs.exists(absPath, function(exists){
        if(exists) {
            fs.readFile(absPath, function(err,data){
                if(err){
                    send404(response)
                } else {
                    sendPage(response, absPath, data);
                }
            });
        } else {
            send404(response);
        }
    });
    }

var server = http.createServer(function(request,response){
    var filePath = false;
    
    if (request.url == '/') {
        filePath = "public/index.html"; // Index Route
    } else if(/^\/?api/.test(request.url)) {
        sendData(response, { test: "This is definitely data" });
        return; // Ignore this for now, it's just so we don't hit the call to serverWorking() below
    } else {
        filePath = "public" + request.url;
    }

    var absPath = "./" + filePath;
    serverWorking(response, absPath);
});

server.listen(3000);