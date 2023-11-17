import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

import Chat from './components/Chat';

const socket = io('http://localhost:5002');

const App = () => {
    const [room, setRoom] = useState('');
    const [name, setName] = useState('');

    const joinRoom = () => {
        if (room && name) {
            socket.emit('joinRoom', { room, name });
        }
    };

    return (
        <div>
            <h3>Join chat</h3>
            <input
                type="text"
                placeholder="Room number"
                onChange={(e) => setRoom(e.target.value)}
            />
            <input
                type="text"
                placeholder="John..."
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={joinRoom} type="button">
                Join
            </button>

            <Chat socket={socket} name={name} room={room} />
        </div>
    );
};

export default App;
