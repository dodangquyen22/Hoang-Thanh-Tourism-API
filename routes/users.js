const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');
// const { authenticateUser, checkRole } = require('../middleware/authentication');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout)

module.exports = router;