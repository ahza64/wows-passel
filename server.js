const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const fetch = require('node-fetch');
const app = express();
var port = process.env.PORT || 8080;

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'build')));



var url = 'https://api.worldofwarships.com/wows/encyclopedia/ships/?type=Destroyer&nation=japan&fields=name%2C+default_profile.concealment&application_id=' + process.env.WOWS_APP_ID;
var jsonn = {};

app.get('/api/wg', function (req, res) {
  var names = [];
  var concealments = [];
  fetch(url)
  .then(response => {
    return response.json();
  })
  .then(data => {
    var data = data.data;
    console.log("ships from WG api", data);
    for (const prop in data) {
      console.log(data[prop].name);
      names.push(data[prop].name);
      concealments.push(data[prop].default_profile.concealment.detect_distance_by_ship);
    }
  })
  .then(data => {
    const state = {
      labels: names,
      datasets: [
        {
          label: 'Concealment',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: concealments
        }
      ]
    }
    res.send(state);
  })
  .catch(err => {
      console.log(err);
  });

});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log('server is runing on ' + port));
