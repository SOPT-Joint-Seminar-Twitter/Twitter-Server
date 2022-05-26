import { Router } from 'express';
import { body } from 'express-validator';
import twitController from '../../controllers/twitController';

const router: Router = Router();

router.post('/', [body('content').notEmpty()], twitController.createTwit);

export default router;
