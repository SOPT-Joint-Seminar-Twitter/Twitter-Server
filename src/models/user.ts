import mongoose from 'mongoose';
import { userInfo } from '../interfaces/user/userInfo';

const twitUserSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    userId: {
        type: String,
    },
    introduce: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.model<userInfo & mongoose.Document>('twitUser', twitUserSchema);
