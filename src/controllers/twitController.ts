import express, { Request, Response } from 'express';
import { twitCreateDto } from '../dto/twit/twitCreateDto';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import util from '../modules/util';
import twitService from '../services/twitService';
const { validationResult } = require('express-validator');

/**
 * @router POST /twit
 * @desc Create twit
 * @access Public
 */
const createTwit = async (req: Request, res: Response) => {
	const err = validationResult(req);

	if (!err.isEmpty()) {
		return res
			.status(statusCode.BAD_REQUEST)
			.send(util.fail(statusCode.BAD_REQUEST, message.CREATE_TWIT_FAIL));
	}

	const twitCreateDto: twitCreateDto = req.body;
	const userId = req.header('userId')
	try {
		if (!userId) {
			res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, "필요한 값이 없습니다."))
		} else {
			const data = await twitService.createTwit(twitCreateDto, userId);

			res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_TWIT_SUCCESS, data));
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
	createTwit,
};
