import PropTypes from 'prop-types';

const Message = ({ message }) => {
    return (
        <div>
            <span>{message.room}</span>
            <span>{message.name}</span>
            <span>{message.time}</span>
            <div>{message.message}</div>
        </div>
    );
};

Message.propTypes = {
    message: PropTypes.shape({
        room: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    })
};

export default Message;
