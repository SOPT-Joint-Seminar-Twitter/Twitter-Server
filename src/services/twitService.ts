import mongoose from 'mongoose';
import { TwitCreateDto } from '../dto/twit/twitCreateDto';
import { BaseResponseDto } from '../interfaces/common/BaseResponseDto';
import retwit from '../models/retwit';
import twit from '../models/twit';
import userMocking from '../models/userMocking';

const createTwit = async (
	twitCreateDto: TwitCreateDto,
	userId: string
): Promise<BaseResponseDto> => {
	try {
		const userObjectId: mongoose.Types.ObjectId =
			userMocking[parseInt(userId) - 1];
		const newTwitCreateDto: TwitCreateDto = {
			content: twitCreateDto.content,
			writer: userObjectId,
		};
		const twitt = new twit(newTwitCreateDto);
		console.log(twitt);
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

const getTwit = async (userId: string) => {
	try {
		const userObjectId: mongoose.Types.ObjectId =
			userMocking[parseInt(userId) - 1];
		const twitList = await twit
			.find({
				writer: userObjectId,
			})
			.populate('writer')
			.select('-__v -retwitUser');
		const newTwitList = await Promise.all(
			twitList.map(async (value: any) => {
				if (Object.keys(value.likeUser).includes(userObjectId.toString())) {
					if (value.likeUser[userObjectId.toString()]) {
						return {
							_id: value._id,
							content: value.content,
							writer: value.writer,
							likeCount: value.likeCount,
							isLike: value.likeUser[userObjectId.toString()],
							isRetwit: false,
						};
					} else {
						return {
							_id: value._id,
							content: value.content,
							writer: value.writer,
							likeCount: value.likeCount,
							isLike: value.likeUser[userObjectId.toString()],
							isRetwit: false,
						};
					}
				} else {
					return {
						_id: value._id,
						content: value.content,
						writer: value.writer,
						likeCount: value.likeCount,
						isLike: false,
						isRetwit: false,
					};
				}
			})
		);
		const retwitList = await retwit.find({
			userId: userObjectId,
		});

		const retwitDataList = await Promise.all(
			retwitList.map(async (value: any) => {
				const twitt: any = await twit
					.findOne({ _id: value.postId })
					.select('-__v -retwitUser')
					.populate('writer');
				if (Object.keys(twitt.likeUser).includes(userObjectId.toString())) {
					if (value.userId[userObjectId.toString()]) {
						return {
							_id: twitt._id,
							content: twitt.content,
							writer: twitt.writer,
							likeCount: twitt.likeCount,
							isLike: twitt.likeUser[userObjectId.toString()],
							isRetwit: true,
						};
					} else {
						return {
							_id: twitt._id,
							content: twitt.content,
							writer: twitt.writer,
							likeCount: twitt.likeCount,
							isLike: twitt.likeUser[userObjectId.toString()],
							isRetwit: true,
						};
					}
				} else {
					return {
						_id: twitt._id,
						content: twitt.content,
						writer: twitt.writer,
						likeCount: twitt.likeCount,
						isLike: false,
						isRetwit: true,
					};
				}
			})
		);

		return [...retwitDataList, ...newTwitList];
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export default {
	createTwit,
	getTwit,
};
