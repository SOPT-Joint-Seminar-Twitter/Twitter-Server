import mongoose from "mongoose";

export interface twitCreateDto {
	content: string,
	writer: mongoose.Types.ObjectId
}
