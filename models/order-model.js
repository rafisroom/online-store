const { ObjectId } = require("mongodb");

const db = require("../data/database");

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

  static transformOrderDocument(orderDoc) {
    return new Order(
      orderDoc.beatData,
      orderDoc.userData,
      orderDoc.status,
      orderDoc.date,
      orderDoc._id
    );
  }

  static transformOrderDocuments(orderDocs) {
    return orderDocs.map(this.transformOrderDocument);
  }

  static async findAll() {
    const orders = await db
      .getDb()
      .collection("orders")
      .find()
      .sort({ _id: -1 })
      .toArray();

    return this.transformOrderDocuments(orders);
  }

  static async findAllForUser(userId) {
    const uid = ObjectId.createFromHexString(userId);

    const orders = await db
      .getDb()
      .collection("orders")
      .find({ "userData._id": uid })
      .sort({ _id: -1 })
      .toArray();

    return this.transformOrderDocuments(orders);
  }

  static async findById(orderId) {
    const order = await db
      .getDb()
      .collection("orders")
      .findOne({ _id: ObjectId.createFromHexString(orderId) });

    return this.transformOrderDocument(order);
  }

  save() {
    if (this.id) {
      const orderId = ObjectId.createFromHexString(this.is);
      return db
      .getDb()
      .collection('orders')
      .updateOne({ _id: orderId }, { $set: { status: this.status } });
    } else {
      const orderDocument = {
        userData: this.userData,
        beatData: this.beatData,
        date: new Date(),
        status: this.status,
      };

      return db.getDb().collection("orders").insertOne(orderDocument);
    }
  }
}

module.exports = Order;
