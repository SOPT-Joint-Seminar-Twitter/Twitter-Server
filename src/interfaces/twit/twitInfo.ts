import mongoose from 'mongoose';

export interface TwitInfo {
	content: string;
	writer: mongoose.Schema.Types.ObjectId;
}
