import mongoose from 'mongoose';
import { twitInfo } from '../interfaces/twit/twitInfo';

const twitSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},

	writer: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
});

export default mongoose.model<twitInfo & mongoose.Document>('twit', twitSchema);
