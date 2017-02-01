var http = require('http'); // module for sending/receiving HTTP requests and creating HTTP servers
var fs = require('fs'); // module for working with the file system

//404 response
function send404Response(response) {
    response.writeHead(404, {"Context-Type": "text/plain"});
    response.write("Error 404: Page not found!")
}

//Handle a user request
function onRequest(request, response){
    console.log("User made a request.");
    if( request.method == 'GET' && request.url == '/') {
        response.writeHead(200, {"Context-Type": "text/html"});
        fs.createReadStream("./index.html").pipe(response);
        console.log("User was sent index.html");
    } else if (request.method == 'GET' && request.url == "stylesheet.css") {
        response.writeHead(200, {"Context-Type": "text/css"});
        fs.createReadStream("./stylesheet.css").pipe(response);
        console.log("User was sent stylesheet.css");
    } else {
        send404Response(response);
        console.log("User was sent 404 error.")
    }    
}

http.createServer(onRequest).listen(3000);
console.log("Server is now running...");