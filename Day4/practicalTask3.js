/**
 * Creates a simple HTTP server that handles GET requests for different routes.
 * Responds with appropriate messages for the homepage and the about page.
 */
const http = require("http");

const server = http.createServer((req, res) => {
    // Handle GET request for the homepage
    if (req.url == '/' && req.method == "GET") {
        res.write("homepage");
        res.end();
    }

    // Handle GET request for the about page
    if (req.url == '/about' && req.method == "GET") {
        res.write("About Us");
        res.end();
    }
});

// Start the server on port 8080
server.listen(8080, () => {
    console.log("Server Started");
});
