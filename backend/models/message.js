import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        chatId: { type: String },
        senderId: { type: String },
        textMessage: { type: String }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Message', messageSchema)
