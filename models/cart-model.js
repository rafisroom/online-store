const Beat = require('./beat-model');

class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  async updatePrices() {
    const beatIds = this.items.map(function (item) {
      return item.beat.id;
    });

    const beats = await Beat.findMultiple(beatIds);

    const deletableCartItemBeatIds = [];

    for (const cartItem of this.items) {
      const beat = beats.find(function (prod) {
        return prod.id === cartItem.beat.id;
      });

      if (!beat) {
        // beat was deleted!
        // "schedule" for removal from cart
        deletableCartItemBeatIds.push(cartItem.beat.id);
        continue;
      }

      // beat was not deleted
      // set beat data and total price to latest price from database
      cartItem.beat = beat;
      cartItem.totalPrice = cartItem.quantity * cartItem.beat.price;
    }

    if (deletableCartItemBeatIds.length > 0) {
      this.items = this.items.filter(function (item) {
        return deletableCartItemBeatIds.indexOf(item.beat.id) < 0;
      });
    }

    // re-calculate cart totals
    this.totalQuantity = 0;
    this.totalPrice = 0;

    for (const item of this.items) {
      this.totalQuantity = this.totalQuantity + item.quantity;
      this.totalPrice = this.totalPrice + item.totalPrice;
    }
  }

  addItem(beat) {
    const cartItem = {
      beat: beat,
      quantity: 1,
      totalPrice: beat.price,
    };

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.beat.id === beat.id) {
        cartItem.quantity = +item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + beat.price;
        this.items[i] = cartItem;

        this.totalQuantity++;
        this.totalPrice += beat.price;
        return;
      }
    }

    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += beat.price;
  }

  updateItem(beatId, newQuantity) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.beat.id === beatId && newQuantity > 0) {
        const cartItem = { ...item };
        const quantityChange = newQuantity - item.quantity;
        cartItem.quantity = newQuantity;
        cartItem.totalPrice = newQuantity * item.beat.price;
        this.items[i] = cartItem;

        this.totalQuantity = this.totalQuantity + quantityChange;
        this.totalPrice += quantityChange * item.beat.price;
        return { updatedItemPrice: cartItem.totalPrice };
      } else if (item.beat.id === beatId && newQuantity <= 0) {
        this.items.splice(i, 1);
        this.totalQuantity = this.totalQuantity - item.quantity;
        this.totalPrice -= item.totalPrice;
        return { updatedItemPrice: 0 };
      }
    }
  }
}

module.exports = Cart;