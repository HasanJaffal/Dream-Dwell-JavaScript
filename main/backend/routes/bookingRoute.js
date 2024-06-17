import express from 'express';
import {
    getAllBooking,
    getBookingById,
    BookingRoom,
    updateBooking,
    deleteBooking,
} from '../controller/booking.js'
import { isAuthenticatedUser,authorizeRoles } from '../middleware/auth.js';

const router = express.Router();
router.get('/',isAuthenticatedUser,getAllBooking);
router.get('/:id',isAuthenticatedUser,getBookingById);

router.post('/',isAuthenticatedUser,BookingRoom);

router.put('/:id', isAuthenticatedUser,updateBooking);
router.delete('/:id',isAuthenticatedUser, deleteBooking);

export default router;