import {Router} from 'express'
import UserRouter from './UserRouter.js'

const router = Router();

router.use('/api/user', UserRouter)

export default router;