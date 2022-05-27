import mongoose from 'mongoose';
import { TwitInfo } from '../interfaces/twit/twitInfo';
import user from './user';

const twitSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},

	writer: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: user,
	},

	likeCount: {
		type: Number,
		required: false,
		default: 0,
	},

	likeUser: {
		type: Object,
		default: { id: true },
	},
});

export default mongoose.model<TwitInfo & mongoose.Document>('twit', twitSchema);
