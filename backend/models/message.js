import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        content: {
            type: String,
            trim: true,
            ref: 'Chat'
        },
        readBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
