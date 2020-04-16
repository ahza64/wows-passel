const fetch = require('node-fetch');
const express = require('express');
const shipsController = require('../../controllers/shipsController.js');
const shipsHEDPMController = require('../../controllers/shipsHEDPMController.js');
const shipsHEALPHAController = require('../../controllers/shipsHEALPHAController.js');
const shipsTraverseController = require('../../controllers/shipsTraverseController.js');

const router = express.Router();


router.get('/ships/concealments/bytier/:tier/:type', shipsController.shipsConcealments);
router.get('/ships/hedpm/bytier/:tier/:type', shipsHEDPMController.shipsHEDPM);
router.get('/ships/healpha/bytier/:tier/:type', shipsHEALPHAController.shipsHEAlpha);
router.get('/ships/traverse/bytier/:tier/:type', shipsTraverseController.shipsTraverse);

module.exports = router;
