const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8080;

const app = express();
const router = express.Router();

const apiWGController = require('./backend/routes/wgAPI/apiWGRoutes.js');
const dbUpdateController = require('./backend/routes/shipsDB/dbUpdateRoutes.js');
const shipsRouter = require('./backend/routes/shipsDB/shipsRoutes.js');

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'build')));
app.use(router);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

apiWGController(app);
dbUpdateController(app);
router.get('/ships/:type/:tier/:field', shipsRouter)

mongoose.connect( process.env.MONGODB_URI ||
                  process.env.MONGOHQ_URL ||
  'mongodb://localhost/wows-passel');

app.listen(port, () => console.log('server is runing on ' + port));
