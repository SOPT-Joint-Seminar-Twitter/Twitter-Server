import mongoose from "mongoose";

export interface RetwitInfo {
    userId: mongoose.Types.ObjectId,
    postId: mongoose.Types.ObjectId
}
