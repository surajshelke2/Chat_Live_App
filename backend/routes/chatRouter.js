const express = require('express');
const { accessChat } = require('../controllers/chatController');
const { protect } = require('../middleware/Authentication');

const router = express.Router();

router.route('/').get(protect, accessChat);

module.exports = router;
