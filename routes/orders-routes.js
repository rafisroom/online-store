const express = require("express");

const ordersContoller = require("../controllers/orders-controller");

const router = express.Router();

router.post('/', ordersContoller.addOrder)

router.get('/', ordersContoller.getOrders)

router.get('/success', ordersContoller.getSuccess)

router.get('/failure', ordersContoller.getFailure)

module.exports = router;
