const fetch = require('node-fetch');
const express = require('express');
const shipsController = require('../../controllers/shipsController.js');

const router = express.Router();


router.get('/ships/:type/:tier/:field', shipsController.shipsGet);

module.exports = router;
