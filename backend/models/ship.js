var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var shipSchema = new Schema({
  description: String,
  has_demo_profile: Boolean,
  images: {
    small: String,
    large: String,
    medium: String,
    contour: String
  },
  is_premium: Boolean,
  is_special: Boolean,
  mod_slots: Number,
  name: String,
  nation: String,
  price_credit: Number,
  price_gold: Number,
  ship_id: Number,
  ship_id_str: String,
  tier: Number,
  type: String,
  default_profile: {
    anti_aircraft: {
      slots: {
        o: {
          avg_damage: Number,
          caliber: Number,
          distance: Number,
          guns: Number,
          name: String
        },
        i: {
          avg_damage: Number,
          caliber: Number,
          distance: Number,
          guns: Number,
          name: String
        }
      },
      defense: Number
    },
    armour: {
      flood_prob: Number,
      flood_damage: Number,
      health: Number,
      range: {
        max: Number,
        min: Number
      },
      total: Number
    },
    artillery: {
      max_dispersion: Number,
      shot_delay: Number,
      rotation_time: Number,
      distance: Number,
      gun_rate: Number,
      artillery_id: Number,
      artillery_id_str: String,
      shells: {
        AP: {
          bullet_mass: Number,
          bullet_speed: Number,
          burn_probability: Number,
          damage: Number,
          name: String,
          type: String
        },
        HE: {
          bullet_mass: Number,
          bullet_speed: Number,
          burn_probability: Number,
          damage: Number,
          name: String,
          type: String
        }
      },
      slots: {
        0: {
            barrels: Number,
            name: String,
            guns: Number
        }
      }
    },
    atbas: {
      distance: Number,
      slots: {
        o: {
          bullet_mass: Number,
          bullet_speed: Number,
          burn_probability: Number,
          damage: Number,
          gun_rate: Number,
          name: String,
          shot_delay: Number,
          type: String
        }
      }
    },
    battle_level_range_max: Number,
    battle_level_range_min: Number,
    concealment: {
      total: Number,
      detect_distance_by_plane: Number,
      detect_distance_by_ship: Number
    },
    engine: {
      engine_id_str: String,
      max_speed: Number,
      engine_id: Number
    },
    fire_control: {
      fire_control_id: Number,
      distance: Number,
      distance_increase: Number,
      fire_control_id_str: String
    },
    hull: {
      hull_id: Number,
      hull_id_str: String,
      torpedoes_barrels: Number,
      anti_aircraft_barrels: Number,
      artillery_barrels: Number,
      atba_barrels: Number,
      health: Number,
      planes_amount: Number,
      range: {
        max: Number,
        min: Number
      }
    },
    mobility: {
      rudder_time: Number,
      total: Number,
      turning_radius: Number,
      max_speed: Number
    },
    torpedoes: {
      distance: Number,
      max_damage: Number,
      reload_time: Number,
      rotation_time: Number,
      slots: {
        0: {
          barrels: Number,
          caliber: Number,
          guns: Number,
          name: String
        }
      },
      torpedo_name: String,
      torpedo_speed: Number,
      torpedoes_id: Number,
      torpedoes_id_str: String,
      visibility_dist: Number
    },
    weaponry: {
      anti_aircraft: Number,
      aircraft: Number,
      artillery: Number,
      torpedoes: Number
    }
  },
  upgrades: Array
}, { typeKey: '$type' });

var Ship = mongoose.model('Ship', shipSchema);
module.exports = Ship;
