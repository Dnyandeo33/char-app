import express from 'express';
import messageController from '../controllers/message.js';

const { createMessage, getMessages } = messageController;
const routers = express.Router();

routers.post('/message', createMessage);
routers.get('/message/:chatId', getMessages);


export default routers;