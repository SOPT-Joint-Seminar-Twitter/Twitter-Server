import { Router } from 'express';
import likeController from '../../controllers/likeController';

const router: Router = Router();

router.post('/:postId', likeController.createLike);

export default router;
