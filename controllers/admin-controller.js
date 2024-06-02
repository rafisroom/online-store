function getBeats(req, res) {
    res.render('admin/beats/all-beats')
}

function getNewBeat(req, res) {
    res.render('admin/beats/new-beat')
}

function createNewBeat() {}

module.exports = {
  getBeats: getBeats,
  getNewBeat: getNewBeat,
  createNewBeat: createNewBeat,
};
