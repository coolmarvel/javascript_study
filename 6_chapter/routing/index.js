const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/home") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ a: "a", b: "b" }));
  } else if (req.url === "/about") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>About Page</h1>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
