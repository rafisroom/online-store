const express = require("express");

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

function signup(req, res) {
  userData = req.body;
} 

function getLogin(req, res) {
    res.render("customer/auth/login");
  }

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup,
}