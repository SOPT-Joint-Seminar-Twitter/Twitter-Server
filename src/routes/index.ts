//router index file
import { Router } from 'express';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import util from '../modules/util';
import twitIndex from './twit';
import userIndex from './user';
import likeIndex from './like';
const router: Router = Router();

router.use('/twit', twitIndex);
router.use('/user', userIndex);
router.use('/like', likeIndex);
router.use((req, res, next) => {
	res.status(404).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
});

export default router;
