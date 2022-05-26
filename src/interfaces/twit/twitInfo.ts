import mongoose from "mongoose"

export interface twitInfo {
	content: string
	writer: mongoose.Schema.Types.ObjectId
}
