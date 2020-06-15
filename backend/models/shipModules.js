var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var shipModuleSchema = new Schema({
    "profile": {
      "hull": {
        "anti_aircraft_barrels": Number,
        "torpedoes_barrels": Number,
        "range": {
          "max": Number,
          "min": Number
        },
        "health": Number,
        "planes_amount": Number,
        "artillery_barrels": Number,
        "atba_barrels": Number
      },
      "artillery": {
          "rotation_time": Number,
          "max_damage_AP": Number,
          "max_damage_HE": Number,
          "gun_rate": Number
      },
      "torpedoes": {
          "torpedo_speed": Number,
          "shot_speed": Number,
          "max_damage": Number,
          "distance": Number
      },
      "fire_control": {
          "distance": Number,
          "distance_increase": Number
      },
      "engine": {
          "max_speed": Number
      },
      "flight_control": {
          "fighter_squadrons": Number,
          "bomber_squadrons": Number,
          "torpedo_squadrons": Number
      },
      "fighter": {
          "cruise_speed": Number,
          "avg_damage": Number,
          "max_ammo": Number,
          "max_health": Number
      },
      "torpedo_bomber": {
          "distance": Number,
          "torpedo_name": String,
          "cruise_speed": Number,
          "torpedo_damage": Number,
          "torpedo_max_speed": Number,
          "max_damage": Number,
          "max_health": Number
      },
      "dive_bomber": {
          "bomb_burn_probability": Number,
          "accuracy": {
              "max": Number,
              "min": Number
          },
          "max_damage": Number,
          "max_health": Number,
          "cruise_speed": Number
      }
    },
    "name": String,
    "image": String,
    "tag": String,
    "module_id_str": String,
    "module_id": Number,
    "type": String,
    "price_credit": Number
}, { typeKey: '$type' });

var ShipModule = mongoose.model('ShipModule', shipModuleSchema);
module.exports = ShipModule;
