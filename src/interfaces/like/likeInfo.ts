import mongoose from "mongoose";

export interface likeInfo {
    twitId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
}
