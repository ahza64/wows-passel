const fetch = require('node-fetch');
const db = require('../../models/ship.js');

module.exports = function (app) {
  app.get('/ships/:type/:tier/:field', function (req, res) {
    console.log("get ships pinged", req.params.type);
    db.find({ tier: req.params.tier,  type: req.params.type})
    .exec(function(err, ships){
      if (err || !ships || !ships.length) {
        return res.status(404).send({message: 'Ships not found.'});
      }
      console.log("ships", ships, `tier ${req.params.tier} class ${req.params.type}`);


      res.send(ships);
    });
  });

}
