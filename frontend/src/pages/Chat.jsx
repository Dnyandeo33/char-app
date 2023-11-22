import { useContext } from 'react';
import { Container, Stack } from 'react-bootstrap';
import ChatBox from '../components/chat/ChatBox';
import PotentialChats from '../components/chat/PotentialChats';
import UserChat from '../components/chat/UserChat';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
    const { userChats, updateCurrentUser } = useContext(ChatContext);
    const { user } = useContext(AuthContext);

    return (
        <Container>
            <PotentialChats />
            {userChats?.length < 1 ? null : (
                <Stack
                    direction="horizontal"
                    gap={4}
                    className="align-items-start"
                >
                    <Stack className=" messages-box flex-grow-0 pe-3" gap={3}>
                        {userChats?.map((chat, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => updateCurrentUser(chat)}
                                >
                                    <UserChat chat={chat} user={user} />
                                </div>
                            );
                        })}
                    </Stack>
                    <ChatBox />
                </Stack>
            )}
        </Container>
    );
};

export default Chat;
