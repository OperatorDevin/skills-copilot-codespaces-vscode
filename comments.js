// create web server
// 1. load modules
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var app = express();

// 2. set up server
var server = http.createServer(app);
server.listen(8080, function() {
  console.log('Server listening at http://localhost:8080');
});

// 3. set up static folder
app.use(express.static(path.join(__dirname, 'public')));
// 4. set up body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 5. set up routes
app.get('/comments', function(req, res) {
  console.log('GET comments');
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.log('error reading comments.json');
      res.status(500).send('Error reading comments.json');
      return;
    }
    var comments = JSON.parse(data);
    res.json(comments);
  });
});

app.post('/comments', function(req, res) {
  console.log('POST comments');
  var comments = req.body;
  fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
    if (err) {
      console.log('error writing comments.json');
      res.status(500).send('Error writing comments.json');
      return;
    }
    res.json(comments);
  });
});