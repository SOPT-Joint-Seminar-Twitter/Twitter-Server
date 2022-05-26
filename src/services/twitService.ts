import { twitCreateDto } from '../dto/twit/twitCreateDto';
import { BaseResponseDto } from '../interfaces/common/BaseResponseDto';
import twit from '../models/twit';

const createTwit = async (
	twitCreateDto: twitCreateDto
): Promise<BaseResponseDto> => {
	try {
		const twitt = new twit(twitCreateDto);

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
