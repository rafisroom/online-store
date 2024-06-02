const db = require('../data/database')

class Beat {
  constructor(beatData) {
    this.title = beatData.title;
    this.summary = beatData.summary;
    this.price = beatData.price;
    this.description = beatData.description;
    this.image = beatData.image; // name of the image file
    this.imagePath = `beat-data/images/${beatData.image}`;
    this.imageUrl = `/beats/assets/images/${beatData.image}`;
    if (beatData._id) {
        this.id = beatData._id.toString()
    }
  }

  static async findAll() {
    const beats = await db.getDb().collection('beats').find().toArray()

    return beats.map(function(beatDocument) {
        return new Beat(beatDocument)
    });
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
