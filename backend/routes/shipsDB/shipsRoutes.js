const fetch = require('node-fetch');
const express = require('express');
const shipsController = require('../../controllers/shipsConcealmentsController.js');
const shipsHEDPMController = require('../../controllers/shipsHEDPMController.js');
const shipsHEALPHAController = require('../../controllers/shipsHEALPHAController.js');
const shipsTraverseController = require('../../controllers/shipsTraverseController.js');
const shipsRudderController = require('../../controllers/shipsRudderController.js');
const shipsFPMController = require('../../controllers/shipsFPMController.js');
const shipsTurnRadiusController = require('../../controllers/shipsTurnRadiusController.js');

const router = express.Router();


router.get('/ships/concealments/bytier/:tier/:type', shipsController.shipsConcealments);
router.get('/ships/hedpm/bytier/:tier/:type', shipsHEDPMController.shipsHEDPM);
router.get('/ships/healpha/bytier/:tier/:type', shipsHEALPHAController.shipsHEAlpha);
router.get('/ships/traverse/bytier/:tier/:type', shipsTraverseController.shipsTraverse);
router.get('/ships/rudder/bytier/:tier/:type', shipsRudderController.shipsRudder);
router.get('/ships/fpm/bytier/:tier/:type', shipsFPMController.shipsFPM);
router.get('/ships/turnradius/bytier/:tier/:type', shipsTurnRadiusController.shipsTurnRadius);

module.exports = router;
