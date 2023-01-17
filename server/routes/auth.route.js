const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

// MIDLEWARE
const auth = require("../middleware/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/isauth", auth(), authController.isAuth);
router.post("/testrole", auth("createAny", "test"), authController.testRole);

module.exports = router;
