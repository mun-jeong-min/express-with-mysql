import * as express from 'express';
import * as dotenv from 'dotenv'
import refreshController from '../../controller/refresh-controller';
dotenv.config()
const router = express.Router();

router.post('/getToken', refreshController.refresh);

export default router