const db = require('../../models/ship.js');

exports.shipsHEAlpha = function (req, res) {
  console.log("get ships HE Alpha pinged", req.params.type);

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
      "healpha": {
        $multiply: [
          "$default_profile.artillery.shells.HE.damage",
          {
            $add: [
              {
                $multiply: [
                  "$default_profile.artillery.slots.0.guns",
                  "$default_profile.artillery.slots.0.barrels"
                ]
              },
              {
                $multiply: [
                  {"$ifNull": ["$default_profile.artillery.slots.1.guns", 1]},
                  {"$ifNull": ["$default_profile.artillery.slots.1.barrels", 1]}
                ]
              }
            ]
          }
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
          backgroundColor: 'orange',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: data
        }
      ]
    }

    res.send(chartData);
  });

};
