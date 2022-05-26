import mongoose from 'mongoose';
import { twitCreateDto } from '../dto/twit/twitCreateDto';
import { BaseResponseDto } from '../interfaces/common/BaseResponseDto';
import twit from '../models/twit';
import userMocking from '../models/userMocking';

const createTwit = async (
	twitCreateDto: twitCreateDto, userId: string
): Promise<BaseResponseDto> => {
	try {
		const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1]
		const newTwitCreateDto: twitCreateDto = {
			content: twitCreateDto.content,
			writer: userObjectId
		}
		const twitt = new twit(newTwitCreateDto);
		console.log(twitt)
		await twitt.save();

		const data = {
			_id: twitt._id,
		};

		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export default {
	createTwit,
};
