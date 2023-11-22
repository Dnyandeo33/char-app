/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Stack } from 'react-bootstrap';
import { ChatContext } from '../../context/ChatContext';
import { useFetchRecipientUser } from '../../hook/useFetchRecipient';
import avtar from '/avtar.svg';
const UserChat = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);

    const { onlineUser } = useContext(ChatContext);
    const isOnline = onlineUser?.some(
        (user) => user.userId === recipientUser?._id
    );
    return (
        <Stack
            direction="horizontal"
            role="button"
            gap={4}
            className=" user-card align-items-center border-bottom border-1 border-light p-2 justify-content-between"
        >
            <div className=" d-flex flex-lg-row justify-content-between">
                <div className="me-2">
                    <img src={avtar} height="35px" />
                </div>
                <div className="text-content d-flex justify-content-center align-items-center gap-2">
                    <div className="name">{recipientUser?.name}</div>
                    <span className={isOnline ? 'user-online' : ''}></span>
                </div>
            </div>
            {/* <div className="d-flex flex-column">
                <div className="date">12/12/2022</div>
                <div className="this-user-notification">2</div>
            </div> */}
        </Stack>
    );
};

export default UserChat;
