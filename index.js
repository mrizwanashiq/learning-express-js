import http from "http";

const server = http.createServer((req, res) => {
	// Check the url
	if (req.url === "/") {
        // Setting the header
		res.writeHead(200, { "Content-Type": "application/json" });
        // Sending the response
		res.end(JSON.stringify({ message: "Hello, world!" }));
	} else if (req.url === "/about") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "About page" }));
	} else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "Page not found" }));
	}
});

server.listen(3000);