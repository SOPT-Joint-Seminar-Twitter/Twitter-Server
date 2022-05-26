import mongoose from 'mongoose';
import { RetwitInfo } from '../interfaces/retwit/retwitInfo';

const retwitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
    }
});

export default mongoose.model<RetwitInfo & mongoose.Document>('retwit', retwitSchema);
