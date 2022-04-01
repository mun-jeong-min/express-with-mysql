import * as express from 'express';
import groupController from '../../controller/group-controller';
const router = express.Router();

router.post('/create', groupController.groupCreate)
router.post('/find', groupController.groupFind)
router.delete('/delete/:id', groupController.groupDelete)
router.patch('/update/:id', groupController.groupUpdate)

export default router