import express from 'express';
import { isAuthenticatedUser,authorizeRoles } from '../middleware/auth.js';
import { deleteUser, getAllUsers, getUserById } from '../controller/user.js';


const router = express.Router();

router.get('/',getAllUsers);
router.get('/:id',getUserById);
router.delete('/:id',deleteUser)

export default router