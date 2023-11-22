import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat, onlineUser } = useContext(ChatContext);
    return (
        <>
            <div className="all-user">
                {potentialChats &&
                    potentialChats.map((oneUser, index) => {
                        return (
                            <div
                                key={index}
                                className="single-user"
                                onClick={() =>
                                    createChat(user?.id, oneUser?._id)
                                }
                            >
                                <div className="user-name">{oneUser?.name}</div>
                                <span
                                    className={
                                        onlineUser?.some(
                                            (user) =>
                                                user?.userId === oneUser?._id
                                        )
                                            ? 'online'
                                            : null
                                    }
                                ></span>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default PotentialChats;
