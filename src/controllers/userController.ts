import express, { Request, Response } from 'express';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import util from '../modules/util';
import UserCreateDto from '../dto/user/userCreateDto';
import userService from '../services/userService';
const { validationResult } = require('express-validator');

/**
 * @router POST /user
 * @desc Create user
 * @access Public
 */
const createUser = async (req: Request, res: Response) => {
	const err = validationResult(req);

	if (!err.isEmpty()) {
		return res
			.status(statusCode.BAD_REQUEST)
			.send(util.fail(statusCode.BAD_REQUEST, message.CREATE_USER_FAIL));
	}

	const userCreateDto: UserCreateDto = req.body;

	try {
		const data = await userService.createUser(userCreateDto);

		res
			.status(statusCode.CREATED)
			.send(
				util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data)
			);
	} catch (err) {
		console.log(err);
		res
			.status(statusCode.INTERNAL_SERVER_ERROR)
			.send(
				util.fail(
					statusCode.INTERNAL_SERVER_ERROR,
					message.INTERNAL_SERVER_ERROR
				)
			);
	}
};

/**
 * @router GET /user
 * @desc GET user
 * @access Public
 */
const getUser = async (req: Request, res: Response) => {
	const userId = req.header('userId');

	try {
		if (!userId) {
			res
				.status(statusCode.BAD_REQUEST)
				.send(util.fail(statusCode.BAD_REQUEST, message.READ_USER_FAIL));
		} else {
			const data = await userService.getUser(userId);

			res
				.status(statusCode.OK)
				.send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
		}
	} catch (err) {
		console.log(err);
		res
			.status(statusCode.INTERNAL_SERVER_ERROR)
			.send(
				util.fail(
					statusCode.INTERNAL_SERVER_ERROR,
					message.INTERNAL_SERVER_ERROR
				)
			);
	}
};

export default {
	createUser,
	getUser,
};
