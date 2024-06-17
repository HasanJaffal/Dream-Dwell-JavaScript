import express from 'express';
import { getRoomById, getRooms,createRoom, updateRoom, deleteRoom } from '../controller/room.js';
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getRooms);
router.route('/:id').get(getRoomById);

router.post('/',isAuthenticatedUser, createRoom)
router.put('/:id',isAuthenticatedUser,updateRoom)
router.delete('/:id',isAuthenticatedUser,deleteRoom)

export default router;