const fetch = require('node-fetch');
const db = require('../../models/shipModules.js');

module.exports = function (app) {
  app.get('/db/updateModulesDB', function (req, res) {
    console.log("update modules DB pinged");
    let moduleStore = [];
    let pageCount = 1;

    fetch('https://api.worldofwarships.com/wows/encyclopedia/modules/?application_id=' + process.env.WOWS_APP_ID + '&page_no=1')
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
    }).then((moduleList) => {
      moduleStore = moduleStore.concat(moduleList);
      if (moduleList.length < 100) {
        console.log("sending ship modules");
        res.send(moduleStore);
        createModule(moduleStore);
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
      fetch('https://api.worldofwarships.com/wows/encyclopedia/modules/?application_id=' + process.env.WOWS_APP_ID + '&page_no=' + n)
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
      }).then((moduleList) => {
        moduleStore = moduleStore.concat(moduleList);
        if (moduleList.length < 100) {
          console.log("sending ships");
          createModule(moduleStore);
          res.send(moduleStore);
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

  function createModule(modules_list) {
    db.remove({}, function(err, modules){
      if(err) {
        console.log('Error occurred in modules remove', err);
      } else {
        console.log('removed all modules');
        db.create(modules_list, function(err, modules){
          if (err) {
            return console.log('err', err);
          }
          console.log("created", modules.length, "modules");
          // process.exit();

        });
      }
    });
  }

};
