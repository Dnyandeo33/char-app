import express from 'express';

const router = express.Router();

import messageControllers from '../controllers/message.js';
import verifyToken from '../middleware/verifyToken.js';

// routes
router.get('/:chatId', messageControllers.getAllMessages);
router.post('/', messageControllers.sendAMessage);

export default router;
