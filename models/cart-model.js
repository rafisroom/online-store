class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItem(beat) {
    const cartItem = {
        beat: beat,
        quantity: 1,
        totalPrice: beat.price
    }
    
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.beat.id === beat.id) {
        cartItem.quantity++;
        cartItem.totalPrice = cartItem.totalPrice + beat.price;
        this.items[i] = cartItem;

        this.totalQuantity++
        this.totalPrice += beat.price
        return;
      }
    }
  
    this.totalQuantity++
    this.totalPrice += beat.price
    this.items.push(cartItem);
  }
}

module.exports = Cart;
