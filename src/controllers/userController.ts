import express, { Request, Response } from 'express';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import util from '../modules/util';
import UserCreateDto from "../dto/user/userCreateDto";
import userService from "../services/userService";
const { validationResult } = require('express-validator');

/**
 * @router POST /user
 * @desc Create user
 * @access Public
 */
const createUser = async (req: Request, res: Response) => {

    const userCreateDto: UserCreateDto = req.body;
    try {
        const data = await userService.createUser(userCreateDto);

        res.status(statusCode.CREATED)
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

export default {
    createUser,
};
