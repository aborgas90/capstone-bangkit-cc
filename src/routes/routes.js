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
router.post("/forget-password",authenticate,handleForgetPassword)

router.post("/product",authenticate, handlePostDataProduct)
router.get("/productList", authenticate ,handleGetAllDataProduct)
router.get("/product/:productId", handleGetDataId)
router.post("/product/:idOrsearch", handleSearchData)
module.exports = router;