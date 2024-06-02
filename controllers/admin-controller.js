function getBeats(req, res) {
  res.render("admin/beats/all-beats");
}

function getNewBeat(req, res) {
  res.render("admin/beats/new-beat");
}

function createNewBeat(req, res) {
  console.log(req.body);
  console.log(req.file);
  res.redirect("/admin/beats");
}

module.exports = {
  getBeats: getBeats,
  getNewBeat: getNewBeat,
  createNewBeat: createNewBeat,
};
