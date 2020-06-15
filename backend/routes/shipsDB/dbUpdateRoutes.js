const fetch = require('node-fetch');
const db = require('../../models/ship.js');
const dbm = require('../../models/shipModules.js');

module.exports = function (app) {
  app.get('/db/updateDB', function (req, res) {
    console.log("update DB pinged");
    let shipStore = [];
    let pageCount = 1;

    fetch('https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id=' + process.env.WOWS_APP_ID + '&page_no=1')
    .then((res) => {
      return res.json()
    })
    .then((resJson) => {
      console.log("resJson", resJson, "resJson");
      function convertObjectToArray(resJsonData) {
        return Object.keys(resJsonData).map(function(k) {
          return resJsonData[k]
        });
      }
      return convertObjectToArray(resJson.data);
    }).then((shipList) => {

      shipList.forEach((ship) => {
        var shipMods = ship.modules;
        Object.keys(shipMods).forEach((modulekey) => {
          if (shipMods[modulekey].length === 1) {
            dbm.find({module_id: shipMods[modulekey][0]}, (err, shipMod) => {
              if(err) {
                console.log('Error occurred in ships remove', err);
              } else {
                ship.modules[modulekey] = shipMod;
              }
            });
          }else if (shipMods[modulekey].length > 1){
            dbm.find({module_id: shipMods[modulekey][1]}, (err, shipMod) => {
              if(err) {
                console.log('Error occurred in ships remove', err);
              } else {
                ship.modules[modulekey] = shipMod;
              }
            });
          }
        });
      });

      shipStore = shipStore.concat(shipList);
      if (shipList.length < 100) {
        console.log("sending ships");
        res.send(shipStore);
        createShip(shipStore);
      } else {
        pageCount++;
        getNextPage(pageCount);
      }
    })
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
    // refactor to pick up data from dedicated DB, GET WG API data and transpose to dedicated DB
    function getNextPage(n) {
      fetch('https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id=' + process.env.WOWS_APP_ID + '&page_no=' + n)
      .then((res) => {
        return res.json()
      })
      .then((resJson) => {
        function convertObjectToArray(resJsonData) {
          return Object.keys(resJsonData).map(function(k) {
            return resJsonData[k]
          });
        }
        return convertObjectToArray(resJson.data);
      }).then((shipList) => {

        shipList.forEach((ship) => {
          var shipMods = ship.modules;
          Object.keys(shipMods).forEach((modulekey) => {
            if (shipMods[modulekey].length > 0) {
              dbm.find({module_id: shipMods[modulekey][0]}, (err, shipMod) => {
                if(err) {
                  console.log('Error occurred in ships remove', err);
                } else {
                  ship.modules[modulekey] = shipMod;
                }
              });
            }else if (shipMods[modulekey].length > 1){
              dbm.find({module_id: shipMods[modulekey][1]}, (err, shipMod) => {
                if(err) {
                  console.log('Error occurred in ships remove', err);
                } else {
                  ship.modules[modulekey] = shipMod;
                }
              });
            }
          });
        });

        shipStore = shipStore.concat(shipList);
        if (shipList.length < 100) {
          console.log("sending ships");
          createShip(shipStore);
          res.send(shipStore);
        } else {
          pageCount++;
          getNextPage(pageCount);
        }
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err);
      });
    }
  });

  function createShip(ships_list) {
    db.remove({}, function(err, ships){
      if(err) {
        console.log('Error occurred in ships remove', err);
      } else {
        console.log('removed all ships');
        db.create(ships_list, function(err, ships){
          if (err) {
            return console.log('err', err);
          }
          console.log("created", ships.length, "ships");
          // process.exit();

        });
      }
    });
  }

};
