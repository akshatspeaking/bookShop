var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

/* GET users listing. */
router.get("/login", userController.getLoginPage);

router.post("/login", userController.emailLogin);

router.get("/register", userController.getRegisterPage);

router.get("/auth/google", userController.googleLogin);

module.exports = router;
