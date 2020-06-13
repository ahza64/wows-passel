var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var shipModuleSchema = new Schema({
    "profile": {
        "torpedoes": {
            "torpedo_speed": Number,
            "shot_speed": Number,
            "max_damage": Number,
            "distance": Number
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
