const db = require('../../models/ship.js');

exports.shipsTurnRadius = function (req, res) {
  console.log("get ships traverse pinged", req.params.type);

  let query = {
    tier: parseInt(req.params.tier),
    type: req.params.type
  };
  let neededShipParams = {
    name: 1,
    "default_profile.mobility.turning_radius": 1
  };

  let pipeline = [
    {$match: query},
    {$project: neededShipParams},
    {$sort: {"default_profile.mobility.turning_radius": 1}}
  ]

  db.aggregate(pipeline)
  .exec(function(err, ships){
    console.log(ships[0]);
    if (err || !ships || !ships.length) {
      return res.status(404).send({message: 'Ships not found.', err});
    }

    var labels = [];
    var data = [];
    ships.forEach(function(ship) {
      labels.push(ship.name);
      data.push(ship.default_profile.mobility.turning_radius);

    });

    let chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Turn Radius',
          backgroundColor: 'mediumPurple',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: data
        }
      ]
    }

    res.send(chartData);
  });

};
