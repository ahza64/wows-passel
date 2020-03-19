const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
var port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, 'build')));

// app.get('/ping', function (req, res) {
//   console.log('pong');
//   return res.send('pong');
// });

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get(['/*'], function (req, res) {
  console.log("base url redirect");
  res.redirect(req.baseUrl + '/');
});

app.listen(port, () => console.log('server is runing on 8080'));
