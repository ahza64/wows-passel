const db = require('../../models/ship.js');

exports.shipsCompare = function (req, res) {
  console.log("get ships Compare pinged", req.params.name);

  let query = {
    name: req.params.name
  };

  let pipeline = [
    {$project: {
      "name": 1,
      "name": 1,
      "tier": 1,
      "default_profile": 1,
      "fpm": {
        $multiply: [
          {"$divide": ["$default_profile.artillery.shells.HE.burn_probability", 100]},
          "$default_profile.artillery.slots.0.guns",
          "$default_profile.artillery.slots.0.barrels",
          {"$ifNull": ["$default_profile.artillery.slots.1.guns", 1]},
          {"$ifNull": ["$default_profile.artillery.slots.1.barrels", 1]},
          "$default_profile.artillery.gun_rate"
        ]
      }
    }},
    {$match: query}
  ]

  db.aggregate(pipeline)
  .exec(function(err, ship){
    console.log(ship[0]);
    if (err || !ship || !ship.length) {
      return res.status(404).send({message: 'Ships not found.', err});
    }

    var data = [
      ship[0].default_profile.hull.health,
      ship[0].default_profile.concealment.detect_distance_by_ship,
      ship[0].default_profile.artillery.rotation_time,
      ship[0].default_profile.mobility.rudder_time,
      ship[0].default_profile.mobility.max_speed,
      ship[0].default_profile.mobility.turning_radius,
      ship[0].fpm
    ];


    let dataset = [
        {
          label: ship[0].name,
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: data
        }
      ]


    res.send(dataset);
  });

};
