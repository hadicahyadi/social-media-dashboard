const express = require('express');
const serveStatic = require("serve-static");
const path = require('path');

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));

const port = process.env.PORT || 8080;
var options = {
  index: "index.html"
};
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// app.use('/', express.static('dist', options));

app.listen(port);
