const express = require("express");

const adminController = require('../controllers/admin-controller')
const imageUploadMiddleware = require("../middleware/img-upload")

const router = express.Router();

router.get("/beats", adminController.getBeats);

router.get("/beats/new", adminController.getNewBeat);

router.post('/beats', imageUploadMiddleware, adminController.createNewBeat)

module.exports = router;