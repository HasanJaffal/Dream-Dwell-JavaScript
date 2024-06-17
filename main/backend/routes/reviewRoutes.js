import express from 'express';
import { createReview, getReviews, updateReview } from '../controller/review.js';
import { isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/',isAuthenticatedUser,getReviews);
router.post('/',isAuthenticatedUser,createReview);
router.put('/:id',isAuthenticatedUser,updateReview);


export default router