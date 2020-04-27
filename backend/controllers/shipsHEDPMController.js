const db = require('../models/ship.js');

exports.shipsHEDPM = function (req, res) {
  console.log("get ships hedpm by tier pinged", req.params.type);

  let query = {
    tier: parseInt(req.params.tier),
    type: req.params.type
  };

  let pipeline = [
    {$project: {
      "name": 1,
      "type": 1,
      "tier": 1,
      "default_profile.artillery": 1,
      "default_profile.hull.health": 1,
      "hedpm": {
        $multiply: [
          "$default_profile.artillery.shells.HE.damage",
          "$default_profile.artillery.slots.0.guns",
          "$default_profile.artillery.slots.0.barrels",
          {"$ifNull": ["$default_profile.artillery.slots.1.guns", 1]},
          {"$ifNull": ["$default_profile.artillery.slots.1.barrels", 1]},
          "$default_profile.artillery.gun_rate"
        ]
      }
    }},
    {$match: query},
    {$sort: {"hedpm": 1}}
  ]

  db.aggregate(pipeline)
  .exec(function(err, ships){
    console.log(ships, "ships from DB");
    if (err || !ships || !ships.length) {
      return res.status(404).send({message: 'Ships not found.', err});
    }

    var labels = [];
    var data = [];
    var data2 = [];
    ships.forEach(function(ship) {
      labels.push(ship.name);
      data.push(ship.hedpm);
      data2.push(ship.default_profile.hull.health)
    });

    let chartData = {
      labels: labels,
      datasets: [
        {
          label: 'HE DPM',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: data
        },
        {
          label: 'Hit Points',
          backgroundColor: 'rgba(255,0,0,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: data2
        }
      ]
    }

    res.send(chartData);
  });

};
