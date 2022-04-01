import * as express from 'express';
import groupController from '../../controller/group-controller';
const router = express.Router();

router.post('/create', groupController.groupCreate)
router.post('/find', groupController.groupFind)

export default router