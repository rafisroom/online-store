const express = require("express");

const cartContoller = require("../controllers/cart-controller");

const router = express.Router();

router.post('/items', cartContoller.addCartItem) // /cart/items using middleware from app.js

module.exports = router;
