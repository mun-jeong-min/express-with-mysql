import * as express from 'express'
import profileController from '../../controller/user/profile-controller'
const router = express.Router()

router.get('/read/:id', profileController.profilePrint)
router.put('/update/:id', profileController.profileUpdate)

export default router