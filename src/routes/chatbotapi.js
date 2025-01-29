const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotapi');

router.post('/message', chatbotController.saveMessage);
router.get('/messages/:MaTaiKhoan', chatbotController.getMessagesByUser);

module.exports = router;
