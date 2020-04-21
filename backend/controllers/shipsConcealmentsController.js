const db = require('../models/ship.js');

exports.shipsConcealments = function (req, res) {
  console.log("get ships concealments pinged", req.params.type);

  let query = {
    tier: parseInt(req.params.tier),
    type: req.params.type
  };
  let neededShipParams = {
    name: 1,
    "default_profile.concealment.detect_distance_by_ship": 1
  };

  let pipeline = [
    {$match: query},
    {$project: neededShipParams},
    {$sort: {"default_profile.concealment.detect_distance_by_ship": 1}}
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
      data.push(ship.default_profile.concealment.detect_distance_by_ship);

    });

    let chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Concealment',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: data
        }
      ]
    }

    res.send(chartData);
  });

};
