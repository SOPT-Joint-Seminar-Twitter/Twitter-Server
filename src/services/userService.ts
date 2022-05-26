import { BaseResponseDto } from '../interfaces/common/BaseResponseDto';
import UserCreateDto from "../dto/user/userCreateDto";
import User from "../models/user";

async function createUser(userCreateDto: UserCreateDto): Promise<BaseResponseDto> {
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

export default {
    createUser,
};
