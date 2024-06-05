const express = require("express");

const cartContoller = require("../controllers/cart-controller");

const router = express.Router();

router.get('/', cartContoller.getCart)

router.post('/items', cartContoller.addCartItem) // /cart/items using middleware from app.js

router.patch('/items', cartContoller.updateCartItem)

module.exports = router;
