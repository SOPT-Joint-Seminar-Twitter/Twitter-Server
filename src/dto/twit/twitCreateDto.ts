import mongoose from 'mongoose';

export interface TwitCreateDto {
	content: string;
	writer: mongoose.Types.ObjectId;
}
