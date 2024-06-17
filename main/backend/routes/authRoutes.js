import express from 'express';
import { getAllBookings, signOut, signin, signup } from '../controller/auth.js';
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js';



const router = express.Router();

router.post('/signUp',signup);
router.post('/signin',signin);
router.get('/signout',signOut)

// for admin
router.route('/admin/booking').get(getAllBookings);
export default router;