import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../../controllers/userController';

const router: Router = Router();

router.post(
	'/',
	[body('userName').notEmpty(), body('userId').notEmpty()],
	userController.createUser
);
router.get('/', userController.getUser);

export default router;
