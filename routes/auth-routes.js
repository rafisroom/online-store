const express = require("express");

const authContoller = require("../controllers/auth-controller");

const router = express.Router();

router.get("/signup", authContoller.getSignup);

router.post("/signup", authContoller.signup);

router.get("/login", authContoller.getLogin);

router.post("/login", authContoller.login);

module.exports = router;