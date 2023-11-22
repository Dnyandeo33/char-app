import express from 'express';
import userControllers from '../controllers/user.js';
const router = express.Router();
const { register, login, findUser, getUsers } = userControllers;

// routes
router.post('/register', register);
router.post('/login', login);
router.get('/:id', findUser);
router.get('/', getUsers);


export default router;
