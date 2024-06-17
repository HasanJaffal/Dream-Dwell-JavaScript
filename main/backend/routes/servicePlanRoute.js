import express from 'express';
import { createServicePlan, deletePlan, getPlans, getServicePlan, updatePlan } from '../controller/servicePlan.js';
import { isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/',isAuthenticatedUser,getPlans);
router.get('/:id',isAuthenticatedUser,getServicePlan);

router.post('/',isAuthenticatedUser, createServicePlan)
router.route('/:id')
.put(isAuthenticatedUser,updatePlan)
.delete(isAuthenticatedUser,deletePlan)

export default router;