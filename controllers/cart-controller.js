const Beat = require("../models/beat-model");

async function addCartItem(req, res) {
  let beat;
    try {
    beat = await Beat.findById(req.body.beatId);
    
  } catch (error) {
    next(error);
    return;
  }
  
  const cart = res.locals.cart
  cart.addItem(beat);
  req.session.cart = cart;

  res.status(201).json({
    message: 'Cart updated!',
    newTotalItems: cart.totalQuantity,
  });
}

module.exports = {
  addCartItem: addCartItem,
};
