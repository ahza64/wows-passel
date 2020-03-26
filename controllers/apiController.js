const fetch = require('node-fetch');

module.exports = function (app) {

  app.get('/api/wg/:type/:nation/:fields', function (req, res) {
    var url = `https://api.worldofwarships.com/wows/encyclopedia/ships/?type=${req.params.type}&nation=${req.params.nation}&application_id=${process.env.WOWS_APP_ID}`;

    var names = [];
    var concealments = [];
    var hedpm = [];
    var healpha = [];
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
          healpha.push(numBarr * dmg);
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
        healpha: healpha,
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

      if (req.params.fields === "concealment") {
        state.datasets[0].label = "Concealment";
        var arrayLabel = state.labels;
        var arrayData = state.datasets[0].data;

        var arrayOfObj = arrayLabel.map(function(d, i) {
          return {
            label: d,
            data: arrayData[i] || 0
          };
        });

        var sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
          let comparison = 0;
          if (a.data > b.data) {
            comparison = 1;
          } else if (a.data < b.data) {
            comparison = -1;
          }
          return comparison;
        });

        var newArrayLabel = [];
        var newArrayData = [];
        sortedArrayOfObj.forEach(function(d){
          newArrayLabel.push(d.label);
          newArrayData.push(d.data);
        });

        state.datasets[0].data = newArrayData;
        state.labels = newArrayLabel;
      }

      if (req.params.fields === "hedpm") {
        state.datasets[0].label = "HE DPM";
        var arrayLabel = state.labels;
        var arrayData = state.hedpm;

        var arrayOfObj = arrayLabel.map(function(d, i) {
          return {
            label: d,
            data: arrayData[i] || 0
          };
        });

        var sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
          let comparison = 0;
          if (a.data > b.data) {
            comparison = 1;
          } else if (a.data < b.data) {
            comparison = -1;
          }
          return comparison;
        });

        var newArrayLabel = [];
        var newArrayData = [];
        sortedArrayOfObj.forEach(function(d){
          newArrayLabel.push(d.label);
          newArrayData.push(d.data);
        });

        state.datasets[0].data = newArrayData;
        state.labels = newArrayLabel;
      }

      if (req.params.fields === "healpha") {
        state.datasets[0].label = "HE alpha";
        var arrayLabel = state.labels;
        var arrayData = state.healpha;

        var arrayOfObj = arrayLabel.map(function(d, i) {
          return {
            label: d,
            data: arrayData[i] || 0
          };
        });

        var sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
          let comparison = 0;
          if (a.data > b.data) {
            comparison = 1;
          } else if (a.data < b.data) {
            comparison = -1;
          }
          return comparison;
        });

        var newArrayLabel = [];
        var newArrayData = [];
        sortedArrayOfObj.forEach(function(d){
          newArrayLabel.push(d.label);
          newArrayData.push(d.data);
        });

        state.datasets[0].data = newArrayData;
        state.labels = newArrayLabel;
      }

      res.send(state);
    })
    .catch(err => {
        console.log(err);
    });

  });
}
