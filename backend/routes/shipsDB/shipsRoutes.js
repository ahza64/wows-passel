const fetch = require('node-fetch');
const express = require('express');
const shipsController = require('../../controllers/shipsCompile/shipsConcealmentsController.js');
const shipsHEDPMController = require('../../controllers/shipsCompile/shipsHEDPMController.js');
const shipsHEALPHAController = require('../../controllers/shipsCompile/shipsHEALPHAController.js');
const shipsTraverseController = require('../../controllers/shipsCompile/shipsTraverseController.js');
const shipsRudderController = require('../../controllers/shipsCompile/shipsRudderController.js');
const shipsFPMController = require('../../controllers/shipsCompile/shipsFPMController.js');
const shipsTurnRadiusController = require('../../controllers/shipsCompile/shipsTurnRadiusController.js');
const shipsFullSpeedController = require('../../controllers/shipsCompile/shipsFullSpeedController.js');
const shipsAPDPMController = require('../../controllers/shipsCompile/shipsAPDPMController.js');
const shipsAPALPHAController = require('../../controllers/shipsCompile/shipsAPALPHAController.js');
const shipsHPController = require('../../controllers/shipsCompile/shipsHPController.js');
const shipsTorpDPMController = require('../../controllers/shipsCompile/shipsTorpDPMController.js');
const shipsTorpALPHAController = require('../../controllers/shipsCompile/shipsTorpALPHAController.js');

const shipController = require('../../controllers/shipsCompare/shipCompare.js');

const router = express.Router();


router.get('/ships/concealments/bytier/:tier/:type', shipsController.shipsConcealments);
router.get('/ships/hedpm/bytier/:tier/:type', shipsHEDPMController.shipsHEDPM);
router.get('/ships/healpha/bytier/:tier/:type', shipsHEALPHAController.shipsHEAlpha);
router.get('/ships/traverse/bytier/:tier/:type', shipsTraverseController.shipsTraverse);
router.get('/ships/rudder/bytier/:tier/:type', shipsRudderController.shipsRudder);
router.get('/ships/fpm/bytier/:tier/:type', shipsFPMController.shipsFPM);
router.get('/ships/turnradius/bytier/:tier/:type', shipsTurnRadiusController.shipsTurnRadius);
router.get('/ships/fullspeed/bytier/:tier/:type', shipsFullSpeedController.shipsFullSpeed);
router.get('/ships/apdpm/bytier/:tier/:type', shipsAPDPMController.shipsAPDPM);
router.get('/ships/apalpha/bytier/:tier/:type', shipsAPALPHAController.shipsAPAlpha);
router.get('/ships/hp/bytier/:tier/:type', shipsHPController.shipsHP);
router.get('/ships/torpdpm/bytier/:tier/:type', shipsTorpDPMController.shipsTorpDPM);
router.get('/ships/torpalpha/bytier/:tier/:type', shipsTorpALPHAController.shipsTorpAlpha);

router.get('/ship/:name', shipController.shipsCompare);

module.exports = router;
