const db = require('../data/database')

class Order {
  //Status -> pending, fulfilled, cancelled
  constructor(cart, userData, status = "pending", date, orderId) {
    this.beatData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString("en-US", {
        weekdat: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    this.id = orderId;
  }

  save() {
    if(this.id) {

    } else {
        const orderDocument = {
            userData: this.userData,
            beatData: this.beatData,
            date: new Date(),
            status: this.data
        };

        return db.getDb().collection('orders').insertOne(orderDocument);
    }
  }
}

module.exports = Order;
