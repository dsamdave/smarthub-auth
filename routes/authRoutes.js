

const express = require("express");
const { validateRegister, validateLogin } = require("../middlewares/validateRegister");
const { handleRegister, handleLogin, handleForgotPassword, handleResetPassword, getAllUser } = require("../controllers/authCtrl");
const auth = require("../middlewares/authentication");

const router = express.Router()


router.post("/register", validateRegister, handleRegister);

router.post("/login", validateLogin,  handleLogin);

router.post("/forgot-password", handleForgotPassword);

router.patch("/reset-password", auth, handleResetPassword);

router.get("/users", getAllUser )


module.exports = router