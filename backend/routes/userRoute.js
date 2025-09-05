const express = require('express');
const { register } = require('../controllers/userController'); // import controller
const {login}=require('../controllers/userController');
const router = express.Router();

router.post('/register', register); // simpler syntax
router.post("/login",login);
module.exports = router;
