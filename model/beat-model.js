const { ObjectId } = require("mongodb");

const db = require("../data/database");
class Beat {
  constructor(beatData) {
    this.title = beatData.title;
    this.summary = beatData.summary;
    this.price = beatData.price;
    this.description = beatData.description;
    this.image = beatData.image; // name of the image file
    this.updateImageData();
    if (beatData._id) {
      this.id = beatData._id.toString();
    }
  }

  static async findById(beatId) {
    let beId;
    try {
      beId = ObjectId.createFromHexString(beatId); // note difference between beId and beatId
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const beat = await db.getDb().collection("beats").findOne({ _id: beId });

    if (!beat) {
      const error = new Error("Could not find beat with provided id.");
      error.code = 404;
      throw error;
    }
    return new Beat(beat);
  }

  static async findAll() {
    const beats = await db.getDb().collection("beats").find().toArray();

    return beats.map(function (beatDocument) {
      return new Beat(beatDocument);
    });
  }

  updateImageData() {
    this.imagePath = `beat-data/images/${this.image}`;
    this.imageUrl = `/beats/assets/images/${this.image}`;
  }

  async save() {
    const beatData = {
      title: this.title,
      summary: this.summary,
      price: +this.price,
      description: this.description,
      image: this.image,
    };

    if (this.id) {
      const beatId = ObjectId.createFromHexString(this.id);

      if (!this.image) {
        delete beatData.image;
      }

      await db
        .getDb()
        .collection("beats")
        .updateOne({ _id: beatId }, { $set: beatData });
    } else {
      await db.getDb().collection("beats").insertOne(beatData);
    }
  }

  replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  async remove() {
    const beatId = ObjectId.createFromHexString(this.id)
    await db.getDb().collection('beats').deleteOne({_id: beatId});
  }
}

module.exports = Beat;
