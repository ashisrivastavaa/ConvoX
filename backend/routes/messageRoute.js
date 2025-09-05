const express=require('express');
const { sendMessage, getMessage } = require('../controllers/messageController');
const { isAuth } = require('../middleware/isAuth');
const router =express.Router();
router.route("/send/:id").post(isAuth,sendMessage);
router.route("/:id").get(isAuth,getMessage);
module.exports=router;