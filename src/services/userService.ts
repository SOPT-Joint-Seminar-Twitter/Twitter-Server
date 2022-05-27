import { BaseResponseDto } from '../interfaces/common/BaseResponseDto';
import UserCreateDto from '../dto/user/userCreateDto';
import User from '../models/user';
import mongoose from 'mongoose';
import { UserResponseDto } from '../dto/user/userResponseDto';
import userMocking from '../models/userMocking';

async function createUser(
	userCreateDto: UserCreateDto
): Promise<BaseResponseDto> {
	try {
		const user = new User(userCreateDto);
		await user.save();

		const data = {
			_id: user._id,
		};

		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
}

const getUser = async (userId: string) => {
	try {
		const userObjectId: mongoose.Types.ObjectId =
			userMocking[parseInt(userId) - 1];

		const user: UserResponseDto | null = await User.findById(
			userObjectId
		).select('-__v');

		return user;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export default {
	createUser,
	getUser,
};
