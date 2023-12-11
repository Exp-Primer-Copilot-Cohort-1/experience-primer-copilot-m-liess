// Create web server
// run: node comments.js
// ----------------------------------------------------------------------------
var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 3000;
var comments = [];

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true);
    var pathname = parsedUrl.pathname;
    var query = parsedUrl.query;
    var id = query.id;
    var name = query.name;
    var comment = query.comment;
    var date = new Date();

    if (pathname === '/') {
        fs.readFile('index.html', function (error, data) {
            if (error) {
                console.log(error);
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            }
        });
    } else if (pathname === '/comments') {
        if (id) {
            console.log('Delete Comment: ' + id);
            comments.splice(id, 1);
            response.writeHead(302, { 'Location': '/' });
            response.end();
        } else if (name && comment) {
            console.log('Add Comment: ' + name + ' ' + comment);
            comments.push({ name: name, comment: comment, date: date });
            response.writeHead(302, { 'Location': '/' });
            response.end();
        } else {
            console.log('Error: name or comment is empty');
            response.writeHead(302, { 'Location': '/' });
            response.end();
        }
    } else {
        response.writeHead(404);
        response.end('Not Found');
    }
});

server.listen(port, function () {
    console.log('Server running at http://localhost:' + port);
});