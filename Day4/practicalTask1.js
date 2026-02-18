/**
 * Creates an HTTP server that handles GET and POST requests for specific routes.
 * Responds with appropriate messages or processes incoming data.
 */
const http = require("http");

const server = http.createServer((req, res) => {
    // Handle GET request for the homepage
    if (req.url == "/" && req.method == "GET") {
        res.writeHead(200, "Welcome to the server");
        res.end();
    }
    // Handle POST request for the /hello route
    else if (req.url == "/hello" && req.method == "POST") {
        let body = "";
  
        // Listen for data chunks
        req.on("data", chunk => {
            body += chunk.toString();
        });

        // Process the complete request body
        req.on("end", () => {
            try {
                const user = JSON.parse(body);
                console.log("New User", user.name);
                res.writeHead(200, { "content-type": "text/plain" });
                res.end("Post Request Received from User " + user.name);
            } catch (Exception) {
                console.log(Exception);
                res.writeHead(500, { "content-type": "text/plain" });
                res.end("Internal Error Occurred");
            }
        });
    }
    // Handle invalid routes
    else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("This link is either not accessible or invalid");
    }
});

// Start the server on port 8080
server.listen(8080, () => {
    console.log("Server Started");
});
