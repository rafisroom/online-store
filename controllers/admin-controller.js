const Beat = require("../model/beat-model");

function getBeats(req, res) {
  res.render("admin/beats/all-beats");
}

function getNewBeat(req, res) {
  res.render("admin/beats/new-beat");
}

async function createNewBeat(req, res, next) {
  const beat = new Beat({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await beat.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/beats");
}
module.exports = {
  getBeats: getBeats,
  getNewBeat: getNewBeat,
  createNewBeat: createNewBeat,
};
