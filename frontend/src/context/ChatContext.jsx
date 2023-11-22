/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userChats, setUserChats] = useState();
    const [potentialChats, setPotentialChats] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setGetMessages] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);

    // initialize socket
    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    // add online user
    useEffect(() => {
        if (socket === null) return;
        socket.emit('addNewUser', user?.id);
        socket.on('getOnlineUsers', (res) => {
            setOnlineUser(res);
        });
        return () => {
            socket.off('getOnlineUsers');
        };
    }, [socket]);

    // send message socket
    useEffect(() => {
        if (socket === null) return;
        const recipientId = currentChat?.members?.find((id) => id !== user?.id);
        socket.emit('sendMessage', { ...newMessage, recipientId });
    }, [newMessage]);

    // receive message
    useEffect(() => {
        if (socket === null) return;

        socket.on('getMessage', (res) => {
            if (currentChat?._id !== res.chatId) return;
            setNewMessage((prev) => [...prev, res]);
        });
        return () => {
            socket.off('getMessage');
        };
    }, [socket, currentChat]);

    // get all users
    useEffect(() => {
        const getUsers = async () => {
            const response = await axios(`http://localhost:3000/`);
            const users = await response.data.users;

            if (response.error) {
                return console.log('Error fetching user', response);
            }

            const pChat = await users?.filter((oneUser) => {
                let isChatCreated = false;
                if (user?.id === oneUser._id) return false;
                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return (
                            chat?.members[0] === oneUser?._id ||
                            chat?.members[1] === oneUser?._id
                        );
                    });
                }
                return !isChatCreated;
            });
            setPotentialChats(pChat);
        };
        getUsers();
    }, [userChats]);

    // get user
    useEffect(() => {
        const getUserChat = async () => {
            setIsLoading(true);
            if (user?.id) {
                const response = await axios.get(
                    `http://localhost:3000/chats/${user?.id}`
                );
                if (response.error) {
                    return setError(response);
                }
                setUserChats([response.data.chat]);
            }
        };
        getUserChat();
    }, [user]);

    // get messages
    useEffect(() => {
        const getMessages = async () => {
            setIsLoading(true);

            const response = await axios.get(
                `http://localhost:3000/message/${currentChat?._id}`
            );
            const message = await response?.data;
            const chat = await message?.chat;
            if (chat.error) {
                return setError(chat);
            }
            setGetMessages(chat);
        };
        getMessages();
    }, [currentChat]);

    // current chat
    const updateCurrentUser = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

    // send text message
    const sendTextMessage = useCallback(
        async (textMessage, sender, currentChatId, setTextMessage) => {
            if (!textMessage) return console.log('type a message...');

            const response = await axios.post(`http://localhost:3000/message`, {
                chatId: currentChatId,
                senderId: sender,
                textMessage: textMessage
            });
            const data = await response.data;

            if (response.error) {
                console.log(data);
            }
            setNewMessage(data);
            setTextMessage('');
            setGetMessages((prev) => [...prev, data]);
        },
        []
    );

    // create chat
    const createChat = useCallback(async (firstId, secondId) => {
        const response = await axios.post('http://localhost:3000/chat', {
            firstId,
            secondId
        });
        const data = await response.data;
        if (response.error) {
            console.log(response.error);
        }
        setUserChats((prev) => [...prev, data.chat]);
    }, []);

    return (
        <ChatContext.Provider
            value={{
                error,
                isLoading,
                userChats,
                potentialChats,
                createChat,
                updateCurrentUser,
                currentChat,
                messages,
                sendTextMessage,
                onlineUser
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
