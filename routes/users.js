const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');
// const { authenticateUser, checkRole } = require('../middleware/authentication');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/viewInfo', userController.viewInfo);
router.post('/ticket', userController.registerTicket);
router.post('/viewTicket', userController.viewTicket);
router.post('/changePass', userController.changePass);
router.post('/changeInfo', userController.changeInfo);

module.exports = router;