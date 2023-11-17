import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Chat.css';

import Message from './Message';

const Chat = ({ socket, name, room }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (message) {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;

            const data = {
                room: room,
                name: name,
                message: message,
                time: `${hours}:${minutes}`
            };

            await socket.emit('newMessage', data);
        }
    };

    useEffect(() => {
        socket.on('getMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });
    }, [socket]);

    return (
        <div>
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                {messages &&
                    messages.map((message, index) => (
                        <Message key={index} message={message} />
                    ))}
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    placeholder="Hey"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage} type="button">
                    &#9658;
                </button>
            </div>
        </div>
    );
};

Chat.propTypes = {
    name: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
    socket: PropTypes.shape({
        emit: PropTypes.func,
        on: PropTypes.func
    })
};

export default Chat;


