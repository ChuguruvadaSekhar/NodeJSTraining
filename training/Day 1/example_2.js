var http = require('http')
http.createServer(function (req, res) {
  console.log(req.url)
  if (req.url === "/?name=Soum") {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('soum');
  }
}).listen(8081);
