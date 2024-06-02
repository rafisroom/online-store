const db = require('../data/database')

class Beat {
  constructor(beatData) {
    this.title = beatData.title;
    this.summary = beatData.summary;
    this.price = beatData.price;
    this.description = beatData.description;
    this.image = beatData.image;
    this.imagePath = `beat-data/images/${beatData.image}`;
    this.imageUrl = `/beats/assets/images/${beatData.image}`;
  }

  async save() {
    const beatData = {
        title: this.title,
        summary: this.summary,
        price: +this.price,
        description: this.description,
        image: this.image,
    }
    
    await db.getDb().collection('beats').insertOne(beatData);
  }
}

module.exports = Beat;
