const Beat = require("../models/beat-model");

async function getAllBeats(req, res, next) {
  try {
    const beats = await Beat.findAll();
    res.render("customer/beats/all-beats", { beats: beats });
  } catch (error) {
    next(error);
  }
}

async function getBeatDetails(req, res, next) {
  try {
    const beat = await Beat.findById(req.params.id);
    res.render('customer/beats/beat-detail', { beat: beat })    
  } catch (error) {
    next(error);
  }
}

module.exports = {
    getAllBeats: getAllBeats,
    getBeatDetails: getBeatDetails,
}