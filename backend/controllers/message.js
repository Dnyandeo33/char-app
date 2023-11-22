import Message from "../models/message.js";

const messageController = {

    createMessage: async (req, res) => {
        const { chatId, senderId, textMessage } = req.body
        try {
            const message = await Message.create({
                chatId, senderId, textMessage
            });

            const response = await message.save()
            return res.status(200).json({ Success: true, message: response });

        } catch (error) {
            return res.status(500).json({ Success: false, error: error })
        }

    },

    getMessages: async (req, res) => {
        const { chatId } = req.params;
        try {
            const chat = await Message.find({ chatId })
            return res.status(200).json({ Success: true, chat: chat })
        } catch (error) {
            return res.status(500).json({ Success: false, error: error })
        }
    }
}

export default messageController;
