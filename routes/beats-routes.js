const express = require("express");

const beatsController = require('../controllers/beats-controller')

const router = express.Router();

router.get('/beats', beatsController.getAllBeats);

router.get('/beats/:id', beatsController.getBeatDetails);

module.exports = router;