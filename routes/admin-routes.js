const express = require("express");

const adminController = require('../controllers/admin-controller')

const router = express.Router();

router.get("/beats", adminController.getBeats);

router.get("/beats/new", adminController.getNewBeat);

module.exports = router;