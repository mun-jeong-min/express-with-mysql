import * as express from 'express';
import commentController from '../../controller/comment-controller';

const router = express.Router();

router.post('/create/:id', commentController.createComment);

router.get('/find', commentController.findComment);

router.put('/update/:id', commentController.updateComment);
 
router.delete('/delete/:id', commentController.deleteComment);

export default router