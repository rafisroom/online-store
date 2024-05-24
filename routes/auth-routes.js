const express = require("express");

const router = express.Router();

const authContoller = require('../controllers/auth-controller')

router.get("/signup", authContoller.getSignup);

router.get('/login', authContoller.getLogin)

router.post('/signup', authContoller.signup)

module.exports = router;
