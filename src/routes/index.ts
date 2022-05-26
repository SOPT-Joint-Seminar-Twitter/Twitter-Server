//router index file
import { Router } from 'express';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import util from '../modules/util';
import index from './twit';

const router: Router = Router();

router.use('/twit', index);
router.use((req, res, next) => {
	res.status(404).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
});

export default router;
