const fetch = require('node-fetch');

module.exports = function (app) {

  app.get('/api/wg/:type/:nation', function (req, res) {
    var url = `https://api.worldofwarships.com/wows/encyclopedia/ships/?type=${req.params.type}&nation=${req.params.nation}&fields=name%2C+default_profile.concealment&application_id=${process.env.WOWS_APP_ID}`;

    var names = [];
    var concealments = [];
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      var data = data.data;
      console.log("ships from the WG apis", data);
      for (const prop in data) {
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
}
