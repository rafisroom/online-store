const express = require("express");

const router = express.Router();

router.get('/beats', function(req, res) {
    res.render('customer/beats/all-beats')
});

module.exports = router;