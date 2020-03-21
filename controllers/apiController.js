const fetch = require('node-fetch');

module.exports = function (app) {

  app.get('/api/wg/:type/:nation/:fields', function (req, res) {
    var url = `https://api.worldofwarships.com/wows/encyclopedia/ships/?type=${req.params.type}&nation=${req.params.nation}&application_id=${process.env.WOWS_APP_ID}`;

    var names = [];
    var concealments = [];
    var hedpm = [];
    var apdpm = [];
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      var data = data.data;
      for (const prop in data) {
        if (data[prop].default_profile.artillery.shells.HE !== undefined) {
          var rof = data[prop].default_profile.artillery.shot_delay;
          var dmg = data[prop].default_profile.artillery.shells.HE.damage;
          var numBarr = data[prop].default_profile.artillery.slots[0].guns * data[prop].default_profile.artillery.slots[0].barrels;
          hedpm.push(((dmg * 60) / rof) * numBarr);
        }else{
          hedpm.push(1);
        }
        names.push(data[prop].name);
        concealments.push(data[prop].default_profile.concealment.detect_distance_by_ship);
      }

    })
    .then(data => {
      const state = {
        hedpm: hedpm,
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

      if (req.params.fields === "hedpm") {
        state.datasets[0].data = hedpm;
        state.datasets[0].label = "HE DPM";
      }
      res.send(state);
    })
    .catch(err => {
        console.log(err);
    });

  });
}
