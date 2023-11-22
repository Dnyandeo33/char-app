import moment from 'moment';
import { useContext, useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import InputEmoji from 'react-input-emoji';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { useFetchRecipientUser } from '../../hook/useFetchRecipient';

const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, sendTextMessage } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipientUser(currentChat, user);
    const [textMessage, setTextMessage] = useState('');

    if (!recipientUser)
        return <p className="no-conversation">No conversation selected yet</p>;
    return (
        <Stack gap={4} className="chat-box">
            <div className="chat-header">
                <strong className="user-text">{recipientUser?.name}</strong>
            </div>
            <Stack gap={3} className="messages-box">
                {messages?.map((message, index) => (
                    <Stack
                        key={index}
                        className={`${
                            message?.senderId === user?.id
                                ? 'messages align-item-start flex-grow-0'
                                : ' align-item-end flex-grow-0'
                        }`}
                    >
                        <div className=" d-flex flex-column">
                            <span className="message-text">
                                {message?.textMessage}
                            </span>
                            <span className="message-date">
                                {moment(message.createdAt).calendar()}
                            </span>
                        </div>
                    </Stack>
                ))}
            </Stack>
            <Stack
                direction="horizontal"
                gap={3}
                className="chat-input flex-grow-0"
            >
                <InputEmoji
                    value={textMessage}
                    onChange={setTextMessage}
                    cleanOnEnter
                    placeholder="Type your message..."
                />
                <Button
                    className="send-btn"
                    onClick={() =>
                        sendTextMessage(
                            textMessage,
                            user?.id,
                            currentChat?._id,
                            sendTextMessage
                        )
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-send"
                        viewBox="0 0 16 16"
                    >
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                    </svg>
                </Button>
            </Stack>
        </Stack>
    );
};

export default ChatBox;
