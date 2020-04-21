const db = require('../models/ship.js');

exports.shipsRudder = function (req, res) {
  console.log("get ships rudder pinged", req.params.type);

  let query = {
    tier: parseInt(req.params.tier),
    type: req.params.type
  };
  let neededShipParams = {
    name: 1,
    "default_profile.mobility.rudder_time": 1
  };
  // let aggregate = {
  //   "default_profile.concealment.detect_distance_by_ship": 1
  // };
  let pipeline = [
    {$match: query},
    {$project: neededShipParams},
    {$sort: {"default_profile.mobility.rudder_time": 1}}
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
      data.push(ship.default_profile.mobility.rudder_time);

    });

    let chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Rudder Shift',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: data
        }
      ]
    }

  // db.find(query, projection).sort(aggregate)
  // .exec(function(err, ships){
  //   if (err || !ships || !ships.length) {
  //     return res.status(404).send({message: 'Ships not found.'});
  //   }
  //
  //   var labels = [];
  //   var data = [];
  //   ships.forEach(function(ship) {
  //     labels.push(ship.name);
  //     data.push(ship.default_profile.concealment.detect_distance_by_ship);
  //
  //   });
    // i can't deal with these errors anymore, giving up for now. just trying to format data here...
// aggregate pipeline db.aggregate(pipeline) var pipeline = [{$group: { count: {$sum: 1}}}]
    // console.log("inside the loop", ships);

    res.send(chartData);
  });

};
