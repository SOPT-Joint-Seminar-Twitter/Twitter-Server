import mongoose from 'mongoose';
import { twitCreateDto } from '../dto/twit/twitCreateDto';
import { BaseResponseDto } from '../interfaces/common/BaseResponseDto';
import twit from '../models/twit';
import userMocking from '../models/userMocking';

const createLike = async (
    postId: string, userId: string
) => {
    try {
        const userObjectId = userMocking[parseInt(userId) - 1]
        const twitt: any = await twit.findById(postId)
        if (Object.keys(twitt.likeUser).includes(userObjectId.toString())) {
            if (twitt.likeUser[userObjectId.toString()]) {
                twitt.likeUser[userObjectId.toString()] = false
                twitt.likeCount -= 1
                console.log(twitt.likeCount)
                await twit.findByIdAndUpdate(postId, twitt)

            } else {
                twitt.likeUser[userObjectId.toString()] = true
                twitt.likeCount += 1
                console.log(twitt.likeCount)
                await twit.findByIdAndUpdate(postId, twitt)
            }
        } else {
            twitt.likeUser[userObjectId.toString()] = true
            twitt.likeCount += 1
            console.log(twitt.likeCount)
            await twit.findByIdAndUpdate(postId, twitt)
        }

        const data = {
            likeCount: twitt.likeCount,
            isLike: twitt.likeUser[userObjectId.toString()]
        }

        return data
    } catch (error) {
        console.log(error)
        throw error
    }
};

export default {
    createLike,
};
