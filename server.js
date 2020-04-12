const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8080;

const app = express();

const apiController = require('./controllers/apiController.js');
const dbController = require('./controllers/dbController.js');

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

apiController(app);
dbController(app);

mongoose.connect( process.env.MONGODB_URI ||
                  process.env.MONGOHQ_URL ||
  'mongodb://localhost/wows-passel');

app.listen(port, () => console.log('server is runing on ' + port));
