import express from 'express';
import { isAuthenticatedUser , authorizeRoles} from '../middleware/auth.js';
import { 
    find,
    findById,
    create,
    updateById,
    deleteById
} from '../controller/methods.js'
import { createRoomType, deleteRoomType, getRoomTypeById, getRoomTypes, updateRoomType } from '../controller/roomType.js';

const router = express.Router();

router.route('/').get(getRoomTypes);
router.route('/:id').get(getRoomTypeById);

router.post('/',isAuthenticatedUser,createRoomType)
router.route('/:id')
.patch(isAuthenticatedUser,updateRoomType)
.delete(isAuthenticatedUser,deleteRoomType)


export default router