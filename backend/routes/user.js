const express = require('express');
const { registerUser, login } = require('../controllers/user');

const router = express.Router();

router.post('/register', registerUser); // Fixed the typo in the endpoint

router.post('/login', login);

module.exports = router;
