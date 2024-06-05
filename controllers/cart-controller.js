const Beat = require("../models/beat-model");

function getCart(req, res) {
  res.render("customer/cart/cart");
}

async function addCartItem(req, res, next) {
  let beat;
  try {
    beat = await Beat.findById(req.body.beatId);
  } catch (error) {
    next(error);
    return;
  }

  const cart = res.locals.cart;

  cart.addItem(beat);
  req.session.cart = cart;

  res.status(201).json({
    message: "Cart updated!",
    newTotalItems: cart.totalQuantity,
  });
}

function updateCartItem(req, res) {
  const cart = res.locals.cart;

  const updatedItemData = cart.updateItem(req.body.beatId, req.body.quantity);

  req.session.cart = cart;

  res.json({
    message: "Item updated!",
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
}

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCartItem: updateCartItem,
};
