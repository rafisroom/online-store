const express = require("express");

const adminController = require('../controllers/admin-controller')
const imageUploadMiddleware = require("../middleware/img-upload")

const router = express.Router();

router.get('/beats', adminController.getBeats); // /admin/beats

router.get('/beats/new', adminController.getNewBeat);

router.post('/beats', imageUploadMiddleware, adminController.createNewBeat);

router.get('/beats/:id', adminController.getUpdateBeat);

router.post('/beats/:id', imageUploadMiddleware, adminController.updateBeat);

router.delete('/beats/:id', adminController.deleteBeat);

router.get('/orders', adminController.getOrders);

router.patch('/orders/:id', adminController.updateOrder);

module.exports = router;