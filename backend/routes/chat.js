import express from 'express';
import chatController from '../controllers/chat.js';

const { createChat, findChat, getUserChat } = chatController;
const routers = express.Router();

routers.post('/chat', createChat);
routers.get('/chats/find/:firstId/:secondId', findChat);
routers.get('/chats/:userId', getUserChat);


export default routers;
