const Beat = require("../models/beat-model");

async function getBeats(req, res, next) {
  try {
    const beats = await Beat.findAll();
    res.render("admin/beats/all-beats", { beats: beats });
  } catch (error) {
    next(error);
    return;
  }
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

async function getUpdateBeat(req, res, next) {
  try {
    const beat = await Beat.findById(req.params.id);
    res.render("admin/beats/update-beat", { beat: beat });
  } catch (error) {
    next(error);
  }
}

async function updateBeat(req, res, next) {
  const beat = new Beat({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    beat.replaceImage(req.file.filename);
  }

  try {
    await beat.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/beats");
}

async function deleteBeat(req, res, next) {
  try {
    beat = await Beat.findById(req.params.id);
    await beat.remove();
  } catch (error) {
    next(error);
    return;
  }

  res.json({message: 'Deleted beat!'});
}

module.exports = {
  getBeats: getBeats,
  getNewBeat: getNewBeat,
  createNewBeat: createNewBeat,
  getUpdateBeat: getUpdateBeat,
  updateBeat: updateBeat,
  deleteBeat: deleteBeat,
};
