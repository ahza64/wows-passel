const db = require('../../models/ship.js');

exports.shipsTorpAlpha = function (req, res) {
  console.log("get ships torp alpha by tier pinged", req.params.type);

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
      "torpalpha": {
        $multiply: [
          "$default_profile.torpedoes.max_damage",
          {
            $add: [
              {
                $multiply: [
                  "$default_profile.torpedoes.slots.0.guns",
                  "$default_profile.torpedoes.slots.0.barrels"
                ]
              },
              {
                $multiply: [
                  {"$ifNull": ["$default_profile.torpedoes.slots.1.guns", 1]},
                  {"$ifNull": ["$default_profile.torpedoes.slots.1.barrels", 1]}
                ]
              }
            ]
          }
        ]
      }
    }},
    {$match: query},
    {$sort: {"torpalpha": 1}}
  ]

  db.aggregate(pipeline)
  .exec(function(err, ships){
    console.log(ships, "ships from DB");
    if (err || !ships || !ships.length) {
      return res.status(404).send({message: 'Ships not found.', err});
    }

    var labels = [];
    var data = [];
    ships.forEach(function(ship) {
      labels.push(ship.name);
      data.push(ship.torpalpha);
    });

    let chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Torp Alpha',
          backgroundColor: 'khaki',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: data
        }
      ]
    }

    res.send(chartData);
  });

};
