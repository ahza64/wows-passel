const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

const apiController = require('./controllers/apiController.js')

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

apiController(app);

app.listen(port, () => console.log('server is runing on ' + port));
