const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');

router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLogin);

router.get('/register', authController.getRegisterPage);
router.post('/register', authController.registerUser);
router.get('/logout', authController.logout);

module.exports = router;
