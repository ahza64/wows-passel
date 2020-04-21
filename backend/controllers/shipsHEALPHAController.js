const db = require('../models/ship.js');

exports.shipsHEAlpha = function (req, res) {
  console.log("get ships HE Alpha pinged", req.params.type);

  let query = {
    tier: parseInt(req.params.tier),
    type: req.params.type
  };
  let neededShipParams = {
    name: 1,
    "default_profile.concealment.detect_distance_by_ship": 1
  };
  // let aggregate = {
  //   "default_profile.concealment.detect_distance_by_ship": 1
  // };
  let pipeline = [
    {$project: {
      "name": 1,
      "type": 1,
      "tier": 1,
      "default_profile.artillery": 1,
      "healpha": {
        $multiply: [
          "$default_profile.artillery.shells.HE.damage",
          "$default_profile.artillery.slots.0.guns",
          "$default_profile.artillery.slots.0.barrels"
        ]
      }
    }},
    {$match: query},
    {$sort: {"healpha": 1}}
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
      data.push(ship.healpha);

    });

    let chartData = {
      labels: labels,
      datasets: [
        {
          label: 'HE Alpha',
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
