import Chat from "../models/chat.js";

const chatController = {
    createChat: async (req, res) => {
        const { firstId, secondId } = req.body;

        try {

            const chat = await Chat.findOne({ members: { $all: [firstId, secondId] } });
            if (chat) return res.status(200).json({ Success: true, chat: chat })

            const newChat = new Chat({
                members: [firstId, secondId]
            });

            const response = await newChat.save();
            return res.status(200).json({ Success: true, response: response })

        } catch (error) {
            return res.status(500).json({ Success: false, error: error })
        }
    },

    getUserChat: async (req, res) => {
        const { userId } = req.params;

        try {
            const chat = await Chat.findOne({ members: { $in: userId } })
            if (chat) return res.status(200).json({ Success: true, chat })
        } catch (error) {
            return res.status(500).json({ Success: false, error: error })
        }
    },

    findChat: async (req, res) => {
        const { firstId, secondId } = req.params;
        try {
            const findChat = await Chat.findOne({ members: { $all: [firstId, secondId] } });
            return res.status(200).json({ Success: true, findChat })

        } catch (error) {
            return res.status(500).json({ Success: false, error: error })
        }
    },

}
export default chatController;
