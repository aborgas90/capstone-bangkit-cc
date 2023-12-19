const express = require("express");
const {
    handleSignup,
    handleLogin,
    handleResetPassword,
    handleForgetPassword,
    handleGetAllDataProduct,
    handlePostDataProduct,
    handleGetDataId,
    handleSearchData,
} = require("../controller/users");

const { authenticate } = require('../middleware/auth')
const router = express.Router();

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.post("/password-reset",authenticate,handleResetPassword)

router.post("/forget-password",handleForgetPassword)

router.post("/product",authenticate, handlePostDataProduct)
router.get("/productList", authenticate ,handleGetAllDataProduct)
router.get("/productList/:productId",authenticate, handleGetDataId)
router.post("/product/:idOrsearch",authenticate, handleSearchData)
module.exports = router;