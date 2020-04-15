const fetch = require('node-fetch');
const express = require('express');
const shipsController = require('../../controllers/shipsController.js');

const router = express.Router();


router.get('/ships/concealments/:tier/:type', shipsController.shipsConcealments);

module.exports = router;
