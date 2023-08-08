const express = require("express");

const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/home");
});

router.get("/home", (req, res) => {
    res.render("dashboard");
});

router.get("/login", authController.getLoginPage);

router.get("/signup", authController.getSignupPage);

router.post("/signup", authController.signUp);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

module.exports = router;
