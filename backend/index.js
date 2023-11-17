import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

import connectToDB from './config/db.js';
import userRoutes from './routes/user.js';

import logger from './middleware/logger.js';

dotenv.config();
connectToDB();
const PORT = process.env.PORT || 5009;

const app = express();

// cors
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use(userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// 404 Not Found handling
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Page is not found' });
});

// listen
const server = app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
});

// socket io
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
});

io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`);

    // join room
    socket.on('joinRoom', (data) => {
        socket.join(data.room);
        console.log(`${data.name} joined room ${data.room}`);
    });

    // message
    socket.on('newMessage', (data) => {
        console.log(data);
        io.to(data.room).emit('getMessage', data);
    });

    socket.on('disconnect', () => {
        console.log(`user disconnected ${socket.id}`);
    });
});
