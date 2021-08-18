import { Router } from 'express';
import UsersRoute from './users.route';

const router = Router();

router.use('/users', UsersRoute);

export default router;
