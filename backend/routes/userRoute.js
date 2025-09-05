const express = require('express');
const { register, getOtherUsers } = require('../controllers/userController'); // import controller
const {login}=require('../controllers/userController');
const {logout}=require('../controllers/userController');
const {isAuth}=require("../middleware/isAuth")

const router = express.Router();

router.post('/register', register); // simpler syntax
router.post("/login",login);
router.get("/logout",logout);
router.get("/",isAuth,getOtherUsers);
module.exports = router;
