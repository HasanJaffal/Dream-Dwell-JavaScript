import express from 'express';
import { createAdditionalSP, deleteAdditionalPlan, getAdditionalPlans, getAdditionalServicePlan, updateAdditionalPlan } from '../controller/additionalSP.js'

const router = express.Router();
router.get('/',getAdditionalPlans);
router.get('/:id',getAdditionalServicePlan);

router.post('/', createAdditionalSP);

router.put('/:id', updateAdditionalPlan);
router.delete('/:id', deleteAdditionalPlan);

export default router;